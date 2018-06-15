import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import MapWebView from './MapWebView';
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