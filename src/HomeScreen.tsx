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
  const [displayItem, setDisplayItem] = React.useState(null);

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

  const handleItemClick = (item) => {
    setDisplayItem(item);
  };

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
        {/* Overlay image */}
        <Image
          source={displayItem ? displayItem.src || null : null}
          style={{
            position: "absolute",
            //If displayItem is null, set width to default, else set width to displayItem.width
            width: displayItem ? displayItem.width : windowWidth * 0.3333,
            //If displayItem is null, set height to default, else set height to displayItem.height
            height: displayItem ? displayItem.height : windowHeight * 0.2,
            alignContent: "center",
            top: displayItem ? displayItem.y : 0,
            left: displayItem ? displayItem.x : 0,
          }}
        />
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
<TouchableOpacity 
    onPress={() => handleItemClick(item)}
    style={{ alignItems: 'center', justifyContent: 'center' }} // <-- Add these
>
    <Image
        source={require("./assets/Back.png")}
        style={{
            flex: 1,
            width: windowWidth * 0.34,
            height: windowHeight * 0.228,
            position: "absolute",
            opacity: 0.75,
            zIndex: -1,
        }}
    />
    <Image source={item.src} style={styles.inventoryItem} />
    <Text
        style={{
            color: "white",
            fontSize: 18,
            bottom: windowHeight * 0.03,
            fontWeight: "bold",
            fontFamily: "Baskerville-Bold",
            textAlign: 'center',  // <-- Add this for horizontal centering of text content
        }}
    >
        {item.name.toUpperCase()}
    </Text>
</TouchableOpacity>
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
  displayedImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20, // Adjust this value for spacing
  },
  displayedItem: {
    // Show full image, no clipping
    width: windowWidth * 0.3333,
    // Justify height
    height: windowHeight * 0.2,
    resizeMode: "contain",
    // Black border
    borderWidth: 2,
    borderColor: "black",
  },
};

export default HomeStackScreen;
