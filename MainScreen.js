import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import AppHeader from './AppHeader';
import TrainListScroller from './TrainListScroller';
import SettingsMenu from './SettingsMenu';

const windowWidth = Dimensions.get('window').width;

class MainScreen extends React.Component {
    state = {
        xPosition: new Animated.Value(1)
    }

    componentDidMount() {
       // this.animateDrawerClose();
    }

    animateDrawerOpen() {
        Animated.timing(
            this.state.xPosition,
            {
                toValue: 1,
                duration: 3000
            }
        ).start();
    }

    animateDrawerClose() {
        Animated.timing(
            this.state.xPosition,
            {
                toValue: 0,
                duration: 1000,
                // useNativeDriver: true
            }
        ).start();
    }

	render() {
        const trains = this.props.trains;
        
        const drawerTransform = this.state.xPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [-1 * (windowWidth), 0]
        });
        
        // //there are some stupid hacks needed in life, and this is one of them.
        // //Reason: Animated's interoplate returns the string "0%" instead of 0%
        // const stringMargin = JSON.stringify(objectMargin);
        // const marginRight = stringMargin.slice(1, stringMargin.length - 1);
        
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
                <Animated.View style={[
                        styles.animatedDrawer,
                        {transform: [{ translateX: drawerTransform }]}
                    ]}
                >
                    <SettingsMenu/>
                </Animated.View>
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