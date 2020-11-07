import * as React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Button, Alert, FlatList, Image, SafeAreaView } from "react-native";
import { WebView, WebViewNavigation } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Flat from './Flat.js'

export const CLIENT_ID = "21197e28f84ce9f";

function parseURLParams(url) {
  let regex = /[?&#]([^=#]+)=([^&#]*)/g,
    params = {},
    match
  while ((match = regex.exec(url))) {
    params[match[1]] = match[2]
  }
  console.log(params)
  return (params);
}

function onNavigationStateChange(navigationState, navigation) {
  const url = navigationState.url
  const API = parseURLParams(url);
  const token = API.access_token;
  console.log(API.access_token);
  if (API.access_token && API.expires_in && API.refresh_token) {
    navigation.push('second', {screen: 'Fill', params: {auth: token}})
    // navigation.push('Fill')
  }
};


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/iphone5.jpg')} style={styles.image}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headline}>Bonjour, veuillez vous connecter.</Text>
          <Button
            title="Connection à Imgur"
            color="black"
            onPress={() => navigation.navigate('Connection')}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

function RechercheScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/iphone4.png')} style={styles.image}>
      </ImageBackground>
    </View>
  );
}

function ProfilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/iphone6.jpg')} style={styles.image}>
      </ImageBackground>
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <WebView style={styles.stylewb} source={{ uri: `https://api.imgur.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&state=APPLICATION_STATE` }}
        onNavigationStateChange={navigationState => {
          onNavigationStateChange(navigationState, navigation)
        }}
      />
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function getStack() {
  return (
    <Stack.Navigator initialRouteName="Bonjour">
      <Stack.Screen name="Bonjour" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen options={{ headerShown: false }} name="Connection" component={DetailsScreen} />
    </Stack.Navigator>)
}

function getTabNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Fill') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'ios-contact' : 'ios-contact';
          } if (route.name === 'Recherche') {
            iconName = focused
              ? 'ios-search'
              : 'ios-search';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
      initialRouteName="Fill"
      initialParams={{auth : null}}
    >
      <Tab.Screen name="Fill" component={Flat} initialParams={{ auth : null}} />
      <Tab.Screen name="Recherche" component={RechercheScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  )
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="first">
        <Stack.Screen options={{ headerShown: false }} name="first" component={getStack} />
        <Stack.Screen options={{ headerShown: false }} name="second" component={getTabNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  image: {
    flex: 1,
  },
  content: {
    color: "red"
  },
  text: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold"
  },
  backdropView: {
    height: 120,
    width: 320,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    top: -100,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black'
  },
  stylewb: {
    height: 400,
    width: 400,
  },
  styleflat: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  }
});

export default App;