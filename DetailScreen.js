import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import MapComponent from './MapComponent';
import TrainPanel from './TrainPanel';
import StationNames from "./static-data/StationNames";


class DetailScreen extends React.Component {
	
	render() {
        return (
            <View style={styles.container}>
                <StatusBar/>
                <View style={styles.detailHeader}>
                    <Text style={{color: 'white'}}>Route to {StationNames[this.props.station]}</Text>
                </View>
                <MapComponent
                    latitude={Number(this.props.clientLocation.split(",")[0])}
                    longitude={Number(this.props.clientLocation.split(",")[1].trim())}
                    station={this.props.station}
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
        backgroundColor: '#222'
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