import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SettingMenu extends React.Component {
	render() {
        return (
        	<View style={styles.container}>
        		<Text style={styles.headerText}>Settings</Text>
        	</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        // position: 'absolute',
        backgroundColor: '#524f7a'
    },
    headerText: {
    	color: '#ffd65e',
    	fontSize: 20
    }
});