import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  PanResponder,
} from 'react-native';

const FlipCard = () => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const flipRotation = useRef(false);
  const [panResponderEnabled, setPanResponderEnabled] = useState(true);

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const flipCard = () => {
    if (panResponderEnabled) {
      flipRotation.current = !flipRotation.current;

      Animated.timing(flipAnimation, {
        toValue: flipRotation.current ? 180 : 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setPanResponderEnabled(false);
        flipCard();
      },
      onPanResponderRelease: () => {
        setPanResponderEnabled(true);
      },
    })
  ).current;

  return (
    <View {...panResponder.panHandlers}>
      <View>
        <Animated.View style={[styles.flipCard, flipToFrontStyle]}>
          <Text>Headline</Text>
        </Animated.View>
        <Animated.View
          style={[styles.flipCard, styles.flipCardBack, flipToBackStyle]}
        >
          <Text>Story</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const FinanceScreen = () => {
  return (
    <View style={styles.container}>
      <FlipCard />
      <FlipCard />
      <FlipCard />
      <FlipCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  flipCard: {
    width: 150,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
  },
});

export default FinanceScreen;
