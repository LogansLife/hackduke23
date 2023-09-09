import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView, useColorScheme, StatusBar, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {enableScreens} from 'react-native-screens';
import HomeScreen from './HomeScreen';
enableScreens();

// Sample screens for the bottom tabs


function SettingsScreen() {
  return (
    <SafeAreaView>
      <Text>Settings Screen</Text>
    </SafeAreaView>
  );
}

function FinanceScreen() {
  return (
    <SafeAreaView>
      <Text>Settings Screen</Text>
    </SafeAreaView>
  );
}
function PoliticsScreen() {
  return (
    <SafeAreaView>
      <Text>Settings Screen</Text>
    </SafeAreaView>
  );
}
const Tab = createBottomTabNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle} flex={1}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="Finance" component={FinanceScreen} />
          <Tab.Screen name="Politics" component={PoliticsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
