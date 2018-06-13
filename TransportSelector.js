import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

const iconPaths = {
	walking: require("./assets/walking-icon.png"),
	biking: require("./assets/biking-icon.png"),
	driving: require("./assets/driving-icon.png")
}

class TransportSelector extends React.Component {
	state = {
		isOpen: false
	};


	renderOpen() {
		return(
			<TouchableOpacity>
				<Image
					// source={}
					// style={}
				/>
				<Image
					// source={}
					// style={}
				/>
				<Image
					// source={}
					// style={}
				/>
			</TouchableOpacity>
		);
	}

	renderClosed() {
		var activeIconPath = iconPaths[this.props.currentTransportation];

		return(
			<TouchableOpacity>
				<Image
					source={activeIconPath}
					style={styles.image}
				/>
			</TouchableOpacity>
		);
	}

	render() {
		const isOpen = this.state.isOpen;
		switch(isOpen) {
			case true: 
				return this.renderOpen();
				break;
			case false:
				return this.renderClosed();
				break;
		}
	}
}

const styles = StyleSheet.create({
	image: {
		// width: (windowWidth / 3.5),
    	// height: (windowWidth / 3.5),
    	padding: 5,
    	borderWidth: 3,
    	borderColor: '#fff',
    	borderRadius: 5,
    	backgroundColor: "#7f8082"
	}
});

export default TransportSelector;