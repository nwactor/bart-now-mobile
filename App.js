import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import StationLocator from './helper-scripts/StationLocator';
import MainScreen from './MainScreen';
import DetailScreen from './DetailScreen';

export default class App extends React.Component {
    state = {
        screen: 'MainScreen',
        trains: [],
        selectedTrain: null,
        currentTransportation: 'walking',
        currentStation: '',
        closestStation: '',
        clientLocation: null,
        geoInterval: null
    };

    componentDidMount() {
        this.configureWebSocket();
        this.loadUserPreferences();
        this.beginGeolocation();
    }

    configureWebSocket() {
        this.socket = SocketIOClient('https://bart-now.herokuapp.com');
        this.socket.on('trainUpdate', trainData => {
            var trains = [];
            trainData.forEach(destination => {
                destination.estimate.forEach((singleTrain, index) => {
                    var train = singleTrain;
                    train.abbreviation = destination.abbreviation;
                    train.destination = destination.destination;
                    trains.push(train);
                });
            });
            // console.log(trains);
            this.setState({trains});
        });
    }

    async loadUserPreferences() {
        var defaultTransportationPreference = await AsyncStorage.getItem('defaultTransportationPreference');
        var defaultStationPreference = await AsyncStorage.getItem('defaultStationPreference');

        if(defaultTransportationPreference !== null) {
            this.setState({currentTransportation: defaultTransportationPreference});
        }
        if(defaultStationPreference !== null) {
            this.setState({currentStation: defaultStationPreference}, () => {
                this.socket.emit('stationRequested', this.state.currentStation);
            });
            
        }
    }

    beginGeolocation() {
        var geoOptions = {
            enableHighAccuracy: true, 
            maximumAge        : 5000,
            timeout           : 4000
        };
        var geoInterval = navigator.geolocation.watchPosition(this.onLocationFound.bind(this), null, geoOptions);
        this.setState({geoInterval});
    }

    async onLocationFound(location) {
        var parsedLocation = location.coords.latitude + ',' + location.coords.longitude;
        console.log(parsedLocation);
        await this.setState({clientLocation: parsedLocation});
    
        var closestStation = StationLocator.getClosestStation(this.state.clientLocation);
        var prevClosestStation = this.state.closestStation;
        if(closestStation !== prevClosestStation) {
            await this.setState({closestStation});
      
            //if there isn't a pre-set station, automatically search 
            //trains for the nearby station that was just found
            if(this.state.currentStation === '') {
                this.setState({currentStation: closestStation}, () => {
                    this.socket.emit('stationRequested', this.state.currentStation);
                });
            }
        }
    }

    // METHODS TO PASS DOWN AS PROPS TO CHILDREN
  
    setCurrentStation(stationAbbr) {
        if(stationAbbr !== '') {
            this.setState({currentStation: stationAbbr}, () => {
            this.socket.emit('stationRequested', this.state.currentStation);
        });
        } else {
            this.setState({currentStation: this.state.closestStation}, () => {
                this.socket.emit('stationRequested', this.state.currentStation);
            });
        }
    }

    setCurrentTransportation(transportationMode) {
        this.setState({currentTransportation: transportationMode});
    }

    onTrainSelect(train) {
        this.setState({selectedTrain: train}, () => {
            //switch to the detail screen only once the train has been set
            this.setState({screen: "DetailScreen"});
        })
    }

    backButtonPressed() {
        this.setState({screen: "MainScreen"});
    }

    // RETURNS CURRENT SCREEN
    renderCurrentScreen() {
        switch(this.state.screen) {
            
            case "MainScreen":
                return (
                    <MainScreen
                        trains={this.state.trains}
                        currentStation={this.state.currentStation}
                        setCurrentStation={this.setCurrentStation.bind(this)}
                        onTrainSelect={this.onTrainSelect.bind(this)}
                    />
                );
                break;
                
            case "DetailScreen":
                return(
                    <DetailScreen
                        station={this.state.currentStation}
                        clientLocation={this.state.clientLocation}
                        currentTransportation={this.state.currentTransportation}
                        train={this.state.selectedTrain}
                        setCurrentTransportation={this.setCurrentTransportation.bind(this)}
                        backButtonPressed={this.backButtonPressed.bind(this)}
                    />
                );
                break;
        }
    }

    //The actual render function just returns whichever screen component the app should be on
    render() {
        return (this.renderCurrentScreen());
    }
}