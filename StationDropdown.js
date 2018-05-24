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
		dropdownValue: "(view nearest station)"
	};

	handleStationSelect(stationName) {
		this.setState({selectValue: stationName});

		if(stationName !== "(view nearest station)") {
			var stationAbbr = this.getStationAbbrFromName(stationName);
			this.props.setCurrentStation(stationAbbr);
		} else {
			this.props.setCurrentStation('');
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
		console.log("Error: Station Not Found.");
	}

	render() {
        return (
    		<ModalDropdown 
    			defaultValue={this.state.dropdownValue}
    			options={stationOptions}
    			style={styles.dropdownButton}
    			onSelect={this.handleStationSelect.bind(this)}
    		/>
        );
    }
}

const styles = StyleSheet.create({
    dropdownButton: {
    	backgroundColor: 'white',
    	borderStyle: 'solid',
    	borderWidth: 1,
    	borderColor: 'gray',
    	borderRadius: 2
    }
});

export default StationDropdown;