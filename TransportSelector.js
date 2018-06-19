import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

const iconPaths = {
	walking: require("./assets/walking-icon.png"),
	biking: require("./assets/biking-icon.png"),
	driving: require("./assets/driving-icon.png")
}

class TransportSelector extends React.Component {
	state = {
		isOpen: false
	};

	handleTouch(newMode) {
		if(this.state.isOpen) {
			this.props.setCurrentTransportation(newMode);
			this.setState({isOpen: false});
		} else {
			this.setState({isOpen: true});
		}
	}

	renderOpen() {
		return(
			<View style={{flex: 1, justifyContent: 'flex-start', width: '100%'}}>
				<TouchableOpacity style={{width: "100%"}} onPress={() => this.handleTouch("walking")}>
					<Image
						source={iconPaths["walking"]}
						style={[styles.image, styles.dropdownImage]}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={{width: "100%"}} onPress={() => this.handleTouch("biking")}>
					<Image
						source={iconPaths["biking"]}
						style={[styles.image, styles.dropdownImage]}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={{width: "100%"}} onPress={() => this.handleTouch("driving")}>
					<Image
						source={iconPaths["driving"]}
						style={[styles.image, styles.dropdownImage]}
					/>
				</TouchableOpacity>
			</View>
		);
	}

	renderClosed() {
		var activeIconPath = iconPaths[this.props.currentTransportation];

		return(
			<TouchableOpacity style={{width: "100%"}} onPress={() => this.handleTouch()}>
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
		width: '95%', //(windowWidth / 3.5),
    	height: '85%', //(windowWidth / 3.5),
    	padding: 5,
    	borderWidth: 3,
    	borderColor: '#fff',
    	borderRadius: 5,
    	backgroundColor: "#7f8082"
	}, dropdownImage: {
		height: "85%"
	}
});

export default TransportSelector;