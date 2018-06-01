import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import AppHeader from './AppHeader';
import TrainListScroller from './TrainListScroller';
import SettingsMenu from './SettingsMenu';

class MainScreen extends React.Component {
	
    constructor() {
        super();
        this.xPosition = new Animated.Value(1);
    }

    componentDidMount() {
       this.animateDrawerClose();
    }

    animateDrawerOpen() {
        Animated.timing(
            this.xPosition,
            {
                toValue: 1,
                duration: 3000
            }
        ).start();
    }

    animateDrawerClose() {
        Animated.timing(
            this.xPosition,
            {
                toValue: 0,
                duration: 3000
            }
        ).start();
    }

	render() {
        const trains = this.props.trains;
        const objectMargin = this.xPosition.interpolate({
            inputRange: [0, 1],
            outputRange: ['100%', '0%']
        });
        
        //there are some stupid hacks needed in life, and this is one of them.
        //Reason: Animated's interoplate returns the string "0%" instead of 0%
        const stringMargin = JSON.stringify(objectMargin);
        const marginRight = stringMargin.slice(1, stringMargin.length - 1);
        
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
                <View style={[
                        styles.animatedDrawer,
                        {marginRight: marginRight}
                    ]}
                >
                    <SettingsMenu/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3'
    },
    animatedDrawer: {
        height: "100%",
        width: "100%",
        position: "absolute"
    }
});

export default MainScreen;