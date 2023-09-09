import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, useColorScheme, StatusBar, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { enableScreens } from "react-native-screens";
import HomeScreen from "./src/HomeScreen";
import FinanceScreen from "./src/FinanceScreen";
import PoliticsScreen from "./src/PoliticsScreen";
import StoreScreen from "./src/StoreScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, View } from "react-native";

enableScreens();

// Stacks for each screen
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const FinanceStack = createStackNavigator();
const PoliticsStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function App() {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [coins, setCoins] = React.useState(0);

  useEffect(() => {
    const getCoins = async () => {
      const userCoins = await AsyncStorage.getItem("userCoins");
      setCoins(parseInt(userCoins, 10));
    };
    getCoins();
  }, [setTimeout(() => {}, 1000)]);

  return (
    <SafeAreaView style={backgroundStyle} flex={1}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerStyle: {
                backgroundColor: "#f5f5f5",
              },
              headerTintColor: "#333",
              headerTitleStyle: {
                fontWeight: "bold",
              },

              // image in middle of header
              headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("./src/assets/salmonnn.png")}
                    style={{ width: 70, height: 50 }}
                  />
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                      marginLeft: 10,
                      // salmon color
                      color: "#ff7f50",
                    }}
                  >
                    {coins}
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Store"
            component={StoreScreen}
            options={{
              headerStyle: {
                backgroundColor: "#f5f5f5",
              },
              headerTintColor: "#333",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("./src/assets/salmonnn.png")}
                    style={{ width: 70, height: 50 }}
                  />
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                      marginLeft: 10,
                      // salmon color
                      color: "#ff7f50",
                    }}
                  >
                    {coins}
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Finance"
            component={FinanceScreen}
            options={{
              headerStyle: {
                backgroundColor: "#f5f5f5",
              },
              headerTintColor: "#333",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("./src/assets/salmonnn.png")}
                    style={{ width: 70, height: 50 }}
                  />
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                      marginLeft: 10,
                      // salmon color
                      color: "#ff7f50",
                    }}
                  >
                    {coins}
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Politics"
            component={PoliticsScreen}
            options={{
              headerStyle: {
                backgroundColor: "#f5f5f5",
              },
              headerTintColor: "#333",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("./src/assets/salmonnn.png")}
                    style={{ width: 70, height: 50 }}
                  />
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                      marginLeft: 10,
                      // salmon color
                      color: "#ff7f50",
                    }}
                  >
                    {coins}
                  </Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
