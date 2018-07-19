import React from 'react';
import reactNative from 'react-native';

class MapWebView extends reactNative.WebView {

	componentDidMount() {
		this.injectJavaScript(`
			var clientLocation = "${this.props.clientLocation}";
			var targetStation = "${this.props.targetStation}";
			var currentTransportation = "${this.props.currentTransportation}";
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