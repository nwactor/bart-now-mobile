import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import StationNames from "./static-data/StationNames";
import StationDropdown from './StationDropdown';
// import TransportSelector from './TransportSelector';

const windowWidth = Dimensions.get('window').width;

class AppHeader extends React.Component {
	render() {
        return (
            <View style={styles.header}>
                <View style={{flex: 2, alignItems: 'center'}}>
        		    <TouchableOpacity onPress={() => this.props.openSettingsPressed()}>
                        <Image style={styles.settingsButton} source={require("./assets/drawer-icon.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 5, alignItems: 'center'}}>
                    <Text style={styles.headerText} numberOfLines={1}>{StationNames[this.props.currentStation]}</Text>
                    <View style={{height: '40%', width: '100%'}}>
                        <StationDropdown
                            selectStation={this.props.setCurrentStation}
                            currentStation={StationNames[this.props.currentStation]}
                        />
                    </View>
                    <View style={{height: '5%'}}/>
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                    {/*
                    <TransportSelector
                        currentTransportation={this.rrops.currentTransportation}
                    />
                    */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
    	flex: 0.15,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    headerText: {
        textAlign: 'center',
        width: '100%',
        // height: '',
        color: 'white',
        fontSize: 20,
    },
    settingsButton: {
        width: (windowWidth / 8),
        height: (windowWidth / 8),
    }
});

export default AppHeader;