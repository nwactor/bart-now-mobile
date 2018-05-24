import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import MapDirections from 'react-native-maps-directions';
import StationNames from './static-data/StationNames';

const apikey = "AIzaSyAR_LPE4jZdV-gYm9V_huAguO50269UqA0";

class MapComponent extends React.Component {

	render() {
        return (
            <MapView 
                style={styles.map}
                initialRegion={{
                    latitude: this.props.latitude,
                    longitude: this.props.longitude,
                    latitudeDelta: 1,
                    longitudeDelta: 1
                }}
            >
                <MapDirections
                    origin={{latitude: this.props.latitude, longitude: this.props.longitude}}
                    destination={StationNames[this.props.station] + " Bart"}
                    apikey={apikey}
                    strokeWidth={3}
                    strokeColor={"#0ab3fb"}
                />
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        height: '40%',//Dimensions.get('window').width * .8,
        backgroundColor: 'blue'
    }
});

export default MapComponent;