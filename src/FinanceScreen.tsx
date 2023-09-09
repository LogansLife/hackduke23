import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  PanResponder,
  ScrollView,
  Linking,
} from "react-native";
import getData from "../APIS/news";
import CoinBalanceSchema from "./CoinBalance";
import summarizer from "../APIS/text-summarizer";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FlipCardProps {
  title: string;
  content: string;
  url: string;
}

const ArticleSchema = {
  name: "Article",
  primaryKey: "id",
  properties: {
    id: "string",
    title: "string",
    content: "string",
    url: "string",
  },
};

const FinanceScreen: React.FC = () => {
  const FlipCard: React.FC<FlipCardProps> = ({ title, content, url }) => {
    const flipAnimation = useRef(new Animated.Value(0)).current;
    const flipRotation = useRef(false);
    const [panResponderEnabled, setPanResponderEnabled] = useState(true);

    const flipToFrontStyle = {
      transform: [
        {
          rotateY: flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ["0deg", "180deg"],
          }),
        },
      ],
    };
    const flipToBackStyle = {
      transform: [
        {
          rotateY: flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ["180deg", "360deg"],
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
        }).start(() => {
          // addCoins(5);
        });
      }
    };

    const storeCoins = async () => {
      try {
        let coins = await getCoins();
        console.log(coins);
        await AsyncStorage.setItem("userCoins", (coins + 1).toString());
      } catch (error) {
        console.error("Error storing coins:", error);
      }
    };

    const getCoins = async () => {
      try {
        const userCoins = await AsyncStorage.getItem("userCoins");
        if (userCoins !== null) {
          // Convert the retrieved value to a number
          return parseInt(userCoins, 10);
        }
        // If the value doesn't exist (first launch), return a default value
        return 0;
      } catch (error) {
        console.error("Error retrieving coins:", error);
        // Handle errors here, e.g., return a default value
        return 0;
      }
    };

    const handlePress = () => {
      if (panResponderEnabled) {
        storeCoins();
        Linking.openURL(url);
      }
    };

    const handleRelease = () => {
      if (panResponderEnabled) {
        // Release without scrolling, open URL
        Linking.openURL(url);
      }
    };

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          setPanResponderEnabled(false);
        },
        onPanResponderRelease: () => {
          // On release, we check if panResponderEnabled is still false
          // This means no scrolling occurred
          handleRelease();
          setPanResponderEnabled(true);
        },
        onResponderTerminate: () => {
          // On termination, we consider it a click
          handleRelease();
          setPanResponderEnabled(true);
        },
      })
    ).current;

    return (
      <View>
        <TouchableOpacity
          {...panResponder.panHandlers}
          onPress={handlePress} // Handle short press
          activeOpacity={1} // Disable the default opacity change on press
        >
          <View>
            <Animated.View style={[styles.flipCard, flipToFrontStyle]}>
              <Text>{title}</Text>
            </Animated.View>
            <Animated.View
              style={[styles.flipCard, styles.flipCardBack, flipToBackStyle]}
            >
              <Text>{content}</Text>
            </Animated.View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const [coins, setCoins] = useState(0);

  const [data, setData] = useState<{
    articles: { id: string; title: string; content: string; url: string }[];
  }>({
    articles: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getData();
        setData(newData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Map FlipCard components to screen based on data */}
        {data.articles.map((item) => (
          <FlipCard
            key={item.id}
            title={item.title}
            content={item.content}
            url={item.url}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flipCard: {
    width: "95%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    backfaceVisibility: "hidden",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    margin: 10,
    padding: 10,
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
  },
});

export default FinanceScreen;
