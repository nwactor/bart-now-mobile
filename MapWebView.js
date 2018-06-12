import React from 'react';
import reactNative from 'react-native';

class MapWebView extends reactNative.WebView {
	componentDidMount() {
		this.injectJavaScript(`var testColor = "red"`);
	}
}

export default MapWebView;