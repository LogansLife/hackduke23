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
import getNewsURLSP from "../APIS/NewsP";
// import getData from "../APIS/test";
import CoinBalanceSchema from "./CoinBalance";
import {summarizer} from "../APIS/text-summarizer";
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

const TechScreen: React.FC = () => {
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
        flipCard();
      }
    };

    const handleRelease = () => {
      if (panResponderEnabled) {
        // Flip the card
        flipCard();

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

  type Article = {
    title: string;
    content: string;
    url: string;
  };

  const [data, setData] = useState<Article[]>([]);




  const extractTextFromURL = (url: string): Promise<ExtractedData> => {
    const endpoint = "https://extractorapi.com/api/v1/extractor";
    const apiKey = "5e848f6a70ce9673491246637048796e96245120"; // Make sure to replace with your actual API key
    const fullURL = `${endpoint}?apikey=${apiKey}&url=${url}`;

    return fetch(fullURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to extract text for URL: ${url}. Status: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Assuming data is the required JSON structure
            return data as ExtractedData;
        })
        .catch(error => {
            throw new Error(`Error occurred: ${error.message}`);
        });
};



type ExtractedData = {
  url: string;
  status: string;
  domain: string;
  title: string;
  author: string[];
  date_published: string;
  images: string[];
  videos: string[];
  text: string;
  html: string;
}

const fetchAllTexts = async (urls: string[]): Promise<ExtractedData[]> => {
  const textsPromises = urls.map((url: string) => extractTextFromURL(url));
  const results = await Promise.allSettled(textsPromises);

  const successfulTexts = results
    .filter(result => result.status === 'fulfilled')
    .map(result => (result as PromiseFulfilledResult<ExtractedData>).value);
  
  return successfulTexts;
};





useEffect(() => {
  const fetchData = async () => {
    try {
      const newData = await getNewsURLSP();

      const urls = newData.articles
      .filter((article) => !article.url.startsWith('https://removed.com'))
      .map((article) => article.url)
      .slice(0,3);

      const responses = await fetchAllTexts(urls);
      const extractedTexts = responses.map(response => response.text);

      // Summarize the texts
      const summarizedArticles = [];
      for (let i = 0; i < extractedTexts.length; i++) {
        const summary = await summarizer(extractedTexts[i]);
        summarizedArticles.push({
          title: responses[i].title,
          content: summary,
          url: responses[i].url
        });
      }
      console.log(summarizedArticles);
      setData(summarizedArticles);

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
      {data.map((item, key) => (
        <FlipCard
          key={key}
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
    height: 275,
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

export default TechScreen;
