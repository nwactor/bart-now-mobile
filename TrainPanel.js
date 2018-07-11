import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

class TrainPanel extends React.Component {
	
	getTimeRemaining() {
		var minutes = this.props.minutes;
		var delay = this.props.delay;

		if(minutes === "Leaving") { return minutes; }
		else {
			var totalTime = parseInt(minutes, 10) + Math.floor(parseInt(delay, 10) / 60);
			if(totalTime <= 60) {
				return totalTime + " min";
			} else {
				return Math.floor(totalTime / 60) + " hour " + (totalTime % 60) + " min";
			}
		}
	}

	returnSelectedTrain() {
		var train = {
			destination: this.props.destination,
			color: this.props.color,
			minutes: this.props.minutes,
			delay: this.props.delay
		}
		this.props.onTrainSelect(train);
	}

	render() {
        return (
            <TouchableOpacity onPress={this.props.onTrainSelect ? () => this.returnSelectedTrain() : () => {}}>
	            <View 
	            	style={[styles.TrainPanel, {height: (this.props.scrollViewHeight ? .13 * this.props.scrollViewHeight : 50)}] }
	            >
	        		<View style={styles.row1}>
								<Text style={styles.destination}>{this.props.destination}</Text>
	        		</View>
	        		<View style={styles.row2}>
	        			<View style={ [styles.colorStripe, { backgroundColor: this.props.color }] }/>
									<Text style={styles.time}>{this.getTimeRemaining()}</Text>
	        		</View>
	            </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
	TrainPanel: {
		height: '10%',
		backgroundColor: '#f7f8f9',
		borderWidth: 1,
		borderRadius: 10,
		marginTop: 4,
		marginBottom: 2,
	},
	row1: {
		height: '40%',
		marginLeft: '5%',
		marginTop: 10,
		marginBottom: 5,
	},
	row2: {
		height: '50%',
		marginLeft: '5%',
		flexDirection: 'row',
		marginBottom: 10,
	},
	colorStripe: {
		width: '40%',
		height: 10,
		borderRadius: 20,
		marginRight: '5%'
	},
	destination: {
		fontSize: 16,
	},
	time: {
		fontSize: 16,
		marginTop: -4,
	}
});

export default TrainPanel;