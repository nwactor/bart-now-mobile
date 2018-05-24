import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StationNames from "./static-data/StationNames";
import StationDropdown from './StationDropdown';

class AppHeader extends React.Component {
	render() {
        return (
            <View style={styles.header}>
        		<Text style={styles.headerText}>{StationNames[this.props.currentStation]}</Text>
        		<StationDropdown setCurrentStation={this.props.setCurrentStation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
    	flex: 0.15,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
    	color: 'white'
    }
});

export default AppHeader;