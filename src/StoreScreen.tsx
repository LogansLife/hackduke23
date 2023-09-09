// import
import React from "react";
import { Button, SafeAreaView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const buyItem = async () => {
  try {
    // Fetch the current array from AsyncStorage
    const currentArray = await AsyncStorage.getItem("items");

    // Parse the current array (assuming it's a JSON string)
    const parsedArray = JSON.parse(currentArray) || [];

    // Add the new item to the array
    parsedArray.push("propellerhat");

    // Store the updated array back in AsyncStorage
    await AsyncStorage.setItem("items", JSON.stringify(parsedArray));

    console.log("Item added to the array:", "chain");
  } catch (error) {
    console.error("Error adding item to the array:", error);
  }
};

function StoreScreen() {
  return (
    <SafeAreaView>
      {/* Button to buy item */}
      <Button title="Buy" onPress={buyItem} />
    </SafeAreaView>
  );
}

export default StoreScreen;
