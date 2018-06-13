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
}

export default MapWebView;