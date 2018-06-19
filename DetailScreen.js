import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import TransportSelector from './TransportSelector';
import MapWebView from './MapWebView';
import TrainPanel from './TrainPanel';
import StationNames from "./static-data/StationNames";


class DetailScreen extends React.Component {
	
    injectJS() {
        return `
                var clientLocation = ${this.props.clientLocation};
                var targetStation = {name: ${StationNames[this.props.station]};
                var currentTransportation = ${this.props.currentTransportation};
                `;
    }

	render() {
        return (
            <View style={styles.container}>
                <StatusBar/>
                <View style={styles.detailHeader}>
                    <View style={{flex: 1}}/>
                    <Text style={{color: 'white', flex: 4}}>Route to {StationNames[this.props.station]}</Text>
                    <View style={{flex: 1}}>
                        <TransportSelector
                            currentTransportation={this.props.currentTransportation}
                            setCurrentTransportation={this.props.setCurrentTransportation}
                        />
                    </View>
                </View>
                <MapWebView
                    source={require('./webview/map.html')}
                    scrollEnabled={false}
                    clientLocation={this.props.clientLocation}
                    targetStation={StationNames[this.props.station]}
                    currentTransportation={this.props.currentTransportation}
                />
                <View style={styles.detailSection}>
                    <TrainPanel
                        destination={this.props.train.destination}
                        color={this.props.train.color}
                        minutes={this.props.train.minutes}
                        delay={this.props.train.delay}
                    />
                </View>
                <TouchableOpacity 
                    style={{height: '5%'}}
                    onPress={() => this.props.backButtonPressed()}
                >
                    <View style={styles.backButton}>
                        <Text>Back</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3'
    },
    detailHeader: {
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222',
        zIndex: 1,
        flexDirection: 'row'
    },
    detailSection: {
        height: '45%'
    },
    backButton: {
        backgroundColor: "#ffffff",
        height: '100%'
    }
});

export default DetailScreen;