import React from "react";
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import images from "./items";
import { FlatList } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function HomeStackScreen() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const getItems = async () => {
      const userItems = await AsyncStorage.getItem("items");
      if (userItems) {
        setItems(JSON.parse(userItems));
      } else {
        setItems([""]);
      }
    };
    getItems();
  }, [items]);

  const filteredImages = images.filter((item) => items.includes(item.name));

  return (
    <GestureHandlerRootView>
      <View>
        {/* Background Image */}
        <Image
          source={require("./assets/bg.jpeg")}
          style={{
            position: "absolute",
            width: windowWidth,
            height: windowHeight * 0.4,
          }}
        />
        {/* Big bear image */}
        <Image source={require("./assets/bigbear.png")} style={styles.bear} />
        {/* Grid of items that user owns (images) */}
        {/* Grid with 2 columns */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* Map item images IF items isnt null*/}
          <FlatList
            data={filteredImages}
            numColumns={3} // Display two columns
            style={styles.buttonContainer}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => (
              <View>
                <Image source={item.src} style={styles.inventoryItem} />
                {/* <Text>{item.name}</Text> */}
              </View>
            )}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = {
  bear: {
    // full image, no clipping, full width
    width: windowWidth,
    height: windowHeight * 0.4,
    resizeMode: "contain",
  },
  button: {
    width: windowWidth,
    height: windowHeight * 0.05,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: windowHeight * 0.005,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
  },
  buttonContainer: {
    top: windowHeight * 0,
    // black border
    borderWidth: 2,
    borderColor: "black",
    // white background
    backgroundColor: "white",
    // 95% width
    width: windowWidth * 0.95,
    // 50% height
    height: windowHeight * 0.5,
    // center horizontally
    alignSelf: "center",
  },
  inventoryItem: {
    // show full image, no clipping
    width: windowWidth * 0.3333,
    //justify height
    height: windowHeight * 0.2,
    resizeMode: "contain",
    // black border
    borderWidth: 2,
    borderColor: "black",
  },
};

export default HomeStackScreen;
