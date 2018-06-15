import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import StationNames from "./static-data/StationNames";
import StationDropdown from './StationDropdown';
import TransportSelector from './TransportSelector';

const windowWidth = Dimensions.get('window').width;

class AppHeader extends React.Component {
	render() {
        return (
            <View style={styles.header}>
                <View style={{flex: 1, alignItems: 'center'}}>
        		    <TouchableOpacity onPress={() => this.props.openSettingsPressed()}>
                        <Image style={styles.settingsButton} source={require("./assets/cog.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 4, alignItems: 'center'}}>
                    <Text style={styles.headerText}>{StationNames[this.props.currentStation]}</Text>
                    <StationDropdown selectStation={this.props.setCurrentStation}/>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <TransportSelector
                        currentTransportation={"driving"}
                    />
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
        flexDirection: 'row',
        zIndex: 1
    },
    headerText: {
    	color: 'white'
    },
    settingsButton: {
        width: (windowWidth / 8),
        height: (windowWidth / 8),
    }
});

export default AppHeader;