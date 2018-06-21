import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import TransportSelector from './TransportSelector';
import MapWebView from './MapWebView';
import TrainPanel from './TrainPanel';
import StationPanel from './StationPanel';
import StationNames from "./static-data/StationNames";


class DetailScreen extends React.Component {

    state = {
        distance: 'updating',
        travelTime:'updating'
    }

    onMessage(event) {
        if (event.nativeEvent.data.split(',')[0] && event.nativeEvent.data.split(',')[1] !== undefined) {
            this.setState({ distance: event.nativeEvent.data.split(',')[0] });
            console.log("distance: " + event.nativeEvent.data.split(',')[0]);
            this.setState({ travelTime: event.nativeEvent.data.split(',')[1] });
            console.log("travelTime: " + event.nativeEvent.data.split(',')[1]);
        }
    }
	render() {
        const injectedScript = () => {
            window.postMessage(message, "*");
            window.postMessage = window.originalPostMessage || window.postMessage;
        }
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
                    injectedJavaScript={`(${String(injectedScript)})()`}
                    scrollEnabled={false}
                    clientLocation={this.props.clientLocation}
                    targetStation={StationNames[this.props.station]}
                    currentTransportation={this.props.currentTransportation}
                    onMessage={this.onMessage.bind(this)}
                />
                <View style={styles.detailSection}>
                    <TrainPanel
                        destination={this.props.train.destination}
                        color={this.props.train.color}
                        minutes={this.props.train.minutes}
                        delay={this.props.train.delay}
                    />

                    <StationPanel
                        distance={this.state.distance}
                        travelTime={this.state.travelTime}
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
        flex: 1,
        // height: '45%'
    },
    backButton: {
        backgroundColor: "#ffffff",
        height: '100%'
    }
});

export default DetailScreen;