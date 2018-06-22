import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import TrainPanel from "./TrainPanel";

class TrainListScroller extends React.Component {
	state = {
		scrollViewHeight: null
	}

	//All of the 10s in parseInt are radixes, ie they specify that we're parsing a base 10 int
	sortTrains(trains) {
		trains.sort((train1, train2) => {
			var train1ETA = parseInt(parseInt(train1.minutes.trim(), 10) + Math.floor(parseInt(train1.delay.trim(), 10), 10) / 60); 
			var train2ETA =	parseInt(parseInt(train2.minutes.trim(), 10) + Math.floor(parseInt(train2.delay.trim(), 10), 10) / 60);
			if(isNaN(parseInt(train1ETA, 10))) { //1 is 'leaving' so it goes first
		      	return -1;
		    } else if(isNaN(parseInt(train2ETA, 10))) { //2 'leaving'
		      	return 1;
		    } else {
		      	return train1ETA - train2ETA; 
		    }
		});
		// console.log(trains);
	}

	//https://github.com/facebook/react-native/issues/17257
	handleLayout(layout) {
		this.setState({
	      	scrollViewHeight: layout.nativeEvent.layout.height
	    });
	}

	render() {
        const trains = this.props.trains.slice(); //clone the array because props can't change
		this.sortTrains(trains);
		const scrollViewHeight = this.state.scrollViewHeight;
        return (
            <View style={styles.traintainer} onLayout={this.handleLayout.bind(this)}>
	            <ScrollView>
	        		{trains.map((train, index) =>
				        <TrainPanel
				          	key={index}
				            destination={train.destination}
				            color={train.hexcolor}
				            minutes={train.minutes}
				            delay={train.delay}
            				scrollViewHeight={scrollViewHeight}
            				onTrainSelect={this.props.onTrainSelect}
				        />
				    )}
	            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	traintainer: {
		flex: 1
	}
});

export default TrainListScroller;