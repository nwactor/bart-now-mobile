import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppHeader from './AppHeader';
import TrainListScroller from './TrainListScroller';

class MainScreen extends React.Component {
	

	render() {
        const trains = this.props.trains;
        return (
            <View style={styles.container}>
                <AppHeader
                    currentStation={this.props.currentStation}
                    setCurrentStation={this.props.setCurrentStation}
                />
                <TrainListScroller
                	trains={trains}
                	onTrainSelect={this.props.onTrainSelect}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3'
    },
});

export default MainScreen;