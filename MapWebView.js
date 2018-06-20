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
		this.injectJavaScript(`
			clientLocation = "${nextProps.clientLocation}";
			targetStation = "${nextProps.targetStation}";
			currentTransportation = "${nextProps.currentTransportation}";
			calcRoute(directionsService, directionsDisplay);
		`);
	}
}

export default MapWebView;