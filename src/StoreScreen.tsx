// import
import React from "react";
import { Button, SafeAreaView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import images from "./items";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";

const buyItem = async (name: String) => {
  try {
    // Fetch the current array from AsyncStorage
    const currentArray = await AsyncStorage.getItem("items");

    // Parse the current array (assuming it's a JSON string)
    const parsedArray = JSON.parse(currentArray) || [];

    // Add the new item to the array
    parsedArray.push(name);

    // Store the updated array back in AsyncStorage
    await AsyncStorage.setItem("items", JSON.stringify(parsedArray));

    // Subtract money
    const currentCoins = await AsyncStorage.getItem("userCoins");
    const parsedCoins = parseInt(currentCoins, 10);
    const itemCost = images.find((item) => item.name === name)?.cost;
    const newCoins = parsedCoins - parseInt(itemCost);
    console.log(newCoins);
    await AsyncStorage.setItem("userCoins", JSON.stringify(newCoins));

    console.log("Item added to the array:", name);
  } catch (error) {
    console.error("Error adding item to the array:", error);
  }
};

function StoreScreen() {
  return (
    <SafeAreaView>
      {/* Map names of all images */}
      {images.map((item) => (
        <TouchableOpacity
          style={styles.button}
          key={item.id}
          onPress={() => buyItem(item.name)}
        >
          <View style={styles.container}>
            <Text style={styles.itemName}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
            <Text style={styles.cost}>{item.cost} salmon</Text>
          </View>
        </TouchableOpacity>
      ))}
      {/* Button to clear AsyncStorage */}
      <Button
        title="Clear AsyncStorage"
        onPress={async () => {
          await AsyncStorage.clear();
          console.log("AsyncStorage cleared!");
        }}
      />
      {/* Button that adds 100 coins */}
      <Button
        title="Add 100 coins"
        onPress={async () => {
          const currentCoins = await AsyncStorage.getItem("userCoins");
          const parsedCoins = parseInt(currentCoins, 10);
          const newCoins = parsedCoins + 100;
          console.log(newCoins);
          await AsyncStorage.setItem("userCoins", JSON.stringify(newCoins));
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    //black border
    borderColor: "black",
    borderWidth: 2,
    margin: 10,
    padding: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
  },
  cost: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "right",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default StoreScreen;
