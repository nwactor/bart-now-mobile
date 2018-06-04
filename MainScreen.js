import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import AppHeader from './AppHeader';
import TrainListScroller from './TrainListScroller';
import SettingsMenu from './SettingsMenu';

const windowWidth = Dimensions.get('window').width;

class MainScreen extends React.Component {
    state = {
        settingMenuPosition: new Animated.Value(0)
    }

    animateDrawerOpen() {
        Animated.timing(
            this.state.settingMenuPosition,
            {
                toValue: 1,
                duration: 500
            }
        ).start();
    }

    animateDrawerClose() {
        Animated.timing(
            this.state.settingMenuPosition,
            {
                toValue: 0,
                duration: 500,
                // useNativeDriver: true
            }
        ).start();
    }

    openSettingsPressed() {
        this.animateDrawerOpen();
    }

    closeSettingsPressed() {
        this.animateDrawerClose();
    }

	render() {
        const trains = this.props.trains;
        
        const drawerTransform = this.state.settingMenuPosition.interpolate({
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
                    openSettingsPressed={this.openSettingsPressed.bind(this)}
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
                    <SettingsMenu
                        closeSettingsPressed={this.closeSettingsPressed.bind(this)}
                    />
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