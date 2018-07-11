import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

class StationPanel extends React.Component {


	render() {
		return (
			<View style = {styles.panel}>
				<View style={styles.infoRow}>
					<Text style={styles.text}> Distance to BART Station: </Text>
						<View style={styles.distanceRow}> 
							<Text style={styles.distance}> {this.props.distance} </Text>
						</View>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.text}> Estimated Travel Time: </Text>
						<View style={styles.travelRow}>
							<Text style={styles.travelTime}> {this.props.travelTime} </Text>
						</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	panel: {
		flex: 1,
		backgroundColor: "#A9A9A9",
		borderWidth: 1,
		borderRadius: 10,
		marginTop: 2,
		marginBottom: 2,
	},
	infoRow: {
		flexDirection: 'row',
		margin: 12,
	},
	text: {
		fontSize: 16,
	},
	distanceRow:{
		flex: 1,
		marginTop: -2,
		backgroundColor: 'white',
		borderWidth: 2,
		borderRadius: 6,
	},
	travelRow:{
		flex: 1,
		marginTop: -2,
		backgroundColor: '#293A41',
		borderWidth: 2,
		borderRadius: 6,
	},
	distance:{
		color: 'black',
		fontSize: 16,
		textAlign: 'center'
	},
	travelTime: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center'
	}
});

export default StationPanel;