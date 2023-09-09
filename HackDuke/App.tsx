import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView, useColorScheme, StatusBar, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {enableScreens} from 'react-native-screens';
import HomeScreen from './src/HomeScreen';
import FinanceScreen from './src/FinanceScreen';
import PoliticsScreen from './src/PoliticsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

enableScreens();

function SettingsScreen() {
  return (
    <SafeAreaView>
      <Text>Settings Screen</Text>
    </SafeAreaView>
  );
}

// Stacks for each screen
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const FinanceStack = createStackNavigator();
const PoliticsStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [coins, setCoins] = React.useState(0);

  useEffect(() => {
    const getCoins = async () => {
      const userCoins = await AsyncStorage.getItem('userCoins');
      setCoins(parseInt(userCoins, 10));
    };
    getCoins();
  }, []);

  const storeCoins = async () => {
    try {
      let coins = await getCoins();
      console.log(coins);
      await AsyncStorage.setItem('userCoins', (coins + 1).toString());
    } catch (error) {
      console.error('Error storing coins:', error);
    }
  };

  const getCoins = async () => {
    try {
      const userCoins = await AsyncStorage.getItem('userCoins');
      if (userCoins !== null) {
        // Convert the retrieved value to a number
        return parseInt(userCoins, 10);
      }
      // If the value doesn't exist (first launch), return a default value
      return 0;
    } catch (error) {
      console.error('Error retrieving coins:', error);
      // Handle errors here, e.g., return a default value
      return 0;
    }
  };

  return (
    <SafeAreaView style={backgroundStyle} flex={1}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: `Coins: ${coins}`,
              headerStyle: {
                backgroundColor: '#f5f5f5',
              },
              headerTintColor: '#333',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerTitle: `Coins: ${coins}`,
              headerStyle: {
                backgroundColor: '#f5f5f5',
              },
              headerTintColor: '#333',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Tab.Screen
            name="Finance"
            children={props => <FinanceScreen storeCoins={storeCoins} />}
            options={{
              headerTitle: `Coins: ${coins}`,
              headerStyle: {
                backgroundColor: '#f5f5f5',
              },
              headerTintColor: '#333',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Tab.Screen
            name="Politics"
            component={PoliticsScreen}
            options={{
              headerTitle: `Coins: ${coins}`,
              headerStyle: {
                backgroundColor: '#f5f5f5',
              },
              headerTintColor: '#333',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
