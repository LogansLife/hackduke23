import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';

const FlipCard = () => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  let flipRotation = 0;
  flipAnimation.addListener(({value}) => (flipRotation = value));

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

  const flipToFront = () => {
    Animated.timing( flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    } ).start();
  };
  const flipToBack = () => {
    Animated.timing( flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    } ).start();
  };

  return (
    <View>
      <View>
        <Animated.View style={[styles.flipCard, flipToFrontStyle]}>
          <Text>Front of the Card</Text>
        </Animated.View>
        <Animated.View
          style={[styles.flipCard, styles.flipCardBack, flipToBackStyle]}>
          <Text>Back of the Card</Text>
        </Animated.View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => (!!flipRotation ? flipToBack() : flipToFront())}>
        <Text>Flip</Text>
      </TouchableOpacity>
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
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'blue',
  },
});

export default FinanceScreen;
