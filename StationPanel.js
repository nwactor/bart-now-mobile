import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

class StationPanel extends React.Component {



	render() {
        return (
	            <View style= {styles.station}>
								
									<Text>{this.props.distance}</Text>
								
									<Text>{this.props.travelTime}</Text>
								
	            </View>
        );
    }
}

const styles = StyleSheet.create({
	station: {
		flex: 1,
		backgroundColor: 'blue',
		borderRadius: 10
	}
});

export default StationPanel;