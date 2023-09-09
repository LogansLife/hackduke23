import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HomeStackScreen({navigation}) {
  return (
    <>
      <View>
        <Image
          source={require('./assets/bear-animal-flat-vector-design-isolated-free-png.webp')}
          style={styles.bear}
        />
        <ScrollView style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Finance')}>
            <Text style={styles.buttonText}>{'Finance'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.buttonText}>{'Settings'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Politics')}>
            <Text style={styles.buttonText}>{'Politics'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Finance')}>
            <Text style={styles.buttonText}>{'Finance'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}

const styles = {
  bear: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.28,
    left: windowWidth * 0.05,
    top: windowHeight * 0.15,
    marginBottom: windowHeight * 0.2,
  },
  button: {
    width: windowWidth,
    height: windowHeight * 0.05,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: windowHeight * 0.005,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonContainer: {
    top: windowHeight * 0,
  },
};

export default HomeStackScreen;
