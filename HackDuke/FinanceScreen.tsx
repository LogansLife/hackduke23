import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  PanResponder,
  ScrollView,
} from 'react-native';
import getData from './APIS/news';

interface FlipCardProps {
  title: string;
  content: string;
}

const FlipCard: React.FC<FlipCardProps> = ({title, content}) => {
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
    }),
  ).current;

  return (
    <View {...panResponder.panHandlers}>
      <View>
        <Animated.View style={[styles.flipCard, flipToFrontStyle]}>
          <Text>{title}</Text>
        </Animated.View>
        <Animated.View
          style={[styles.flipCard, styles.flipCardBack, flipToBackStyle]}>
          <Text>{content}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const FinanceScreen: React.FC = () => {
  const [data, setData] = useState<{
    articles: {id: string; title: string; content: string}[];
  }>({
    articles: [],
  });

  useEffect(() => {
    // Call `getData` and handle the Promise
    getData()
      .then(newData => {
        setData(newData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Map FlipCard components to screen based on data */}
        {data.articles.map(item => (
          <FlipCard key={item.id} title={item.title} content={item.content} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipCard: {
    width: '95%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    margin: 10,
    padding: 10,
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
  },
});

export default FinanceScreen;
