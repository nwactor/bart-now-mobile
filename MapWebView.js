import React from 'react';
import reactNative from 'react-native';

class MapWebView extends reactNative.WebView {

	componentDidMount() {
		this.injectJavaScript(`
			var clientLocation = "${this.props.clientLocation}";
			var targetStation = "${this.props.targetStation}";
			var currentTransportation = "${this.props.currentTransportation}";
			var trainName = "${this.props.train.destination}";
			var trainColor = "${this.props.train.color}";
			var trainMinutes = "${this.props.train.minutes}";
			var trainDelay = "${this.props.train.delay}"
			var platform = "${this.props.train.platform}";
			var carNumber = "${this.props.cars}";
			var bikeFriendly = "${this.props.bike}";
		`);
	}

	componentWillUpdate(nextProps) {
		if(this.props.targetStation !== nextProps.targetStation || 
			this.props.currentTransportation != nextProps.currentTransportation ||
			this.props.clientLocation !== nextProps.clientLocation) {
				this.injectJavaScript(`
					clientLocation = "${nextProps.clientLocation}";
					targetStation = "${nextProps.targetStation}";
					currentTransportation = "${nextProps.currentTransportation}";
					calcRoute(directionsService, directionsDisplay);
					getDistanceToStationsFromClient(targetStation);
				`);
		}
	}
}

export default MapWebView;