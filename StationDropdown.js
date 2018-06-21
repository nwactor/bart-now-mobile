import React from 'react';
import { StyleSheet, Picker } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import StationNames from "./static-data/StationNames";

const stationOptions = ['(view nearest station)'];
Object.values(StationNames).forEach(name => {
	stationOptions.push(name);
});

class StationDropdown extends React.Component {
	state = {
		defaultValue: "(view nearest station)",
		defaultIndex: 0
	};

	handleStationSelect(dropdownIndex) {
		if(dropdownIndex !== '0') {
			var stationAbbr = this.getStationAbbrFromName(dropdownIndex);
			this.props.selectStation(stationAbbr);
		} else {
			this.props.selectStation('');
		}
	}

	getStationAbbrFromName(dropdownIndex) {
		var stationName = stationOptions[dropdownIndex];
		var stationAbbrs = Object.keys(StationNames);
		//Interesting: This code doesn't work with a for each loop.
		//Even when the strings are identical, casted to type String,
		//and trimmed, a for each loop will never say that they're equal.
		for(let i = 0; i < stationAbbrs.length; i++) {
			if(StationNames[stationAbbrs[i]] === stationName) {
				console.log(stationAbbrs[i]);
				return stationAbbrs[i];
			}
		}
		console.log("Error: Station Not Found - " + stationName);
	}

	render() {
        return (
    		<ModalDropdown 
    			defaultValue={this.props.currentStation || this.state.defaultValue}
    			options={stationOptions}
    			style={styles.dropdownButton}
    			textStyle={styles.buttonText}
    			dropdownStyle={styles.dropdown}
    			dropdownTextHighlightStyle={styles.selectedOption}
    			onSelect={this.handleStationSelect.bind(this)}
    		/>
        );
    }
}

const styles = StyleSheet.create({
    dropdownButton: {
    	width: '100%',
    	backgroundColor: 'white',
    	borderStyle: 'solid',
    	borderWidth: 1,
    	borderColor: 'gray',
    	borderRadius: 5
    },
    buttonText: {
    	textAlign: 'center'
    },
    dropdown: {
    	width: '100%'
    },
    selectedOption: {
   		backgroundColor: '#ffdb59'
    }
});

export default StationDropdown;