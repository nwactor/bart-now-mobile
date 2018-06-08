import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import StationDropdown from './StationDropdown';
import StationNames from './static-data/StationNames';

const windowWidth = Dimensions.get('window').width;

export default class SettingMenu extends React.Component {
    state = {
        defaultStationPreference: '',
        defaultTransportationPreference: ''
    }

    componentDidMount() {
        this.getDefaults();
    }

    async getDefaults() {
        var defaultStationPreference = await AsyncStorage.getItem('defaultStationPreference');
        var defaultTransportationPreference = await AsyncStorage.getItem('defaultTransportationPreference');

        this.setState({defaultStationPreference});
        this.setState({defaultTransportationPreference});
    }

    setUserDefaultStation(station) {
        // console.log("station " + station);

        AsyncStorage.setItem('defaultStationPreference', station);
        this.setState({defaultStationPreference: station});
    }

    setUserDefaultTransportation(transportationMode) {
        AsyncStorage.setItem('defaultTransportationPreference', transportationMode);
        this.setState({defaultTransportationPreference: transportationMode});
    }

    render() {
        return (
        	<View style={styles.container}>
        		<View style={styles.headerSection}>
        			<TouchableOpacity onPress={() => this.props.closeSettingsPressed()} style={{flex: 1}}>
        				<Image style={styles.closeButton} source={require("./assets/cog.png")}/>
        			</TouchableOpacity>
        			<Text style={styles.headerText}>Your Defaults</Text>
        			<View style={{flex: 1}}/>
        		</View>
        		<View style={{flex: 2}}>
        			<Text style={styles.optionText}>Transport Mode</Text>
        			<View style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        				<Image style={styles.transportationIcon} source={require("./assets/walk-icon.png")}
                            onPress={() => this.setUserDefaultTransportation("walking")}
                        />
        				<Image style={styles.transportationIcon} source={require("./assets/bike-icon.png")}
                            onPress={() => this.setUserDefaultTransportation("biking")}
                        />
        				<Image style={styles.transportationIcon} source={require("./assets/car-icon.png")}
                            onPress={() => this.setUserDefaultTransportation("driving")}
                        />
        			</View>
        		</View>
        		<View style={{flex: 2}}>
        			<Text style={styles.optionText}>{`Station: ${StationNames[this.state.defaultStationPreference] || 'Nearest'}`}</Text>
        			<View style={{display: "flex", justifyContent: "center", width: "40%"}}>
        				<StationDropdown selectStation={this.setUserDefaultStation.bind(this)}/>
        			</View>
        		</View>
        	</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#524f7a',
    },
    headerSection: {
    	flex: 1, 
    	flexDirection: 'row',
    	justifyContent: 'center',
    	alignItems: 'center'
    },
    headerText: {
    	color: '#ffd65e',
    	fontSize: 30,
    	textAlign: 'center',
    	flex: 4
    },
    optionText: {
    	color: '#ffd65e',
    	fontSize: 20,
    	marginBottom: 5
    },
    transportationIcon: {
    	width: (windowWidth / 3.5),
    	height: (windowWidth / 3.5),
    	padding: 5,
    	borderWidth: 3,
    	borderColor: '#fff',
    	borderRadius: 5,
    	backgroundColor: "#7f8082"
    },
    highlightedTransportationIcon: {
        width: (windowWidth / 3.5),
        height: (windowWidth / 3.5),
        padding: 5,
        borderWidth: 3,
        borderColor: '#fff',
        borderRadius: 5,
        backgroundColor: "#7f8082"
    },
    closeButton: {
    	width: (windowWidth / 8),
        height: (windowWidth / 8),
    }
});