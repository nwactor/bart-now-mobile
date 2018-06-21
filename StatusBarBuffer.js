import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';


class StatusBarBuffer extends React.Component {
	render() {
		return(
			<View style={styles.statusbarBuffer}/>
		);
	}
}

const statusbarHeight = (Platform.OS === 'ios') ? 20 : 0;

const styles = StyleSheet.create({
	statusbarBuffer: {
        height: statusbarHeight,
        backgroundColor: "#222"
    },
});

export default StatusBarBuffer;