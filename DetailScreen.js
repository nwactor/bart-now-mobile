import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import StatusBarBuffer from './StatusBarBuffer';
import TransportSelector from './TransportSelector';
import MapWebView from './MapWebView';
import TrainPanel from './TrainPanel';
import StationPanel from './StationPanel';
import StationNames from "./static-data/StationNames";


class DetailScreen extends React.Component {

    state = {
        distance: 'Updating',
        travelTime:'Updating',
    }

    onMessage(event) {
        console.log(event.nativeEvent.data);
        if (event.nativeEvent.data.split(',')[0] && event.nativeEvent.data.split(',')[1] !== undefined) {
            this.setState({ distance: event.nativeEvent.data.split(',')[0] });
            this.setState({ travelTime: event.nativeEvent.data.split(',')[1] });
        }
    }

	render() {
        const injectedScript = () => {
            window.postMessage(message, "*");
            window.postMessage = window.originalPostMessage || window.postMessage;
        }
        return (
            <View style={styles.container}>
                <StatusBar  barStyle={"light-content"}/>
                <StatusBarBuffer/>
                <View style={styles.detailHeader}>
                    <View style={{flex: 1}}/>
                    <Text style={styles.headerText}>Route to <Text style={{fontWeight: 'bold'}}>{StationNames[this.props.station]}</Text></Text>
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
                <View style={styles.backWrapper}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => this.props.backButtonPressed()}
                    >
                        <Text style={{color: 'white'}}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
    },
    detailHeader: {
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222',
        zIndex: 1,
        flexDirection: 'row'
    },
    headerText: {
        color: 'white',
        flex: 4,
        fontSize: 20,
        textAlign: 'center'
    },
    detailSection: {
       flex: 1,
       marginLeft: 4,
       marginRight: 4
    },
    backWrapper: {
        height: '7%', 
        alignItems: 'center', 
        marginLeft: 4, 
        marginRight: 4, 
        marginTop: 2, 
        marginBottom: 2,
    },
    backButton: {
        backgroundColor: "#A9A9A9",
        height: '100%',
        width: '100%',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default DetailScreen;