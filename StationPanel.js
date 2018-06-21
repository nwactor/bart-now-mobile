import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

class StationPanel extends React.Component {



		render() {
				return (
						<View style = {styles.station}>
								
								<View style={styles.infoRow}>
										<Text style={styles.text}> Distance to BART Station: </Text>
												<View style={styles.inputRow}> 
														<Text> {this.props.distance} </Text>
												</View>
								</View>
											
								<View style={styles.infoRow}>
										<Text style={styles.text}> Estimated Travel Time: </Text>
												<View style={styles.inputRow}>
														<Text> {this.props.travelTime} </Text>
												</View>
								</View>
									
						</View>
				);
		}
}

const styles = StyleSheet.create({
	station: {
		flex: 1,
		backgroundColor: 'gray',
		height: '10%',
		backgroundColor: '#f7f8f9',
		borderWidth: 1,
		borderRadius: 10,
		marginTop: 2,
		marginBottom: 2,
		marginLeft: 4,
		marginRight: 8,
		paddingTop: 10
	},
	infoRow: {
		flexDirection: 'row',
		margin: 12
	},
	text: {
		// height: '10%',
		// marginLeft: '5%'
	},
	inputRow:{
		marginTop: -2,
		backgroundColor: '#f7f8f9',
		borderWidth: 2,
		borderRadius: 10,
	}
});

export default StationPanel;