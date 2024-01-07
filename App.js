import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/components/LoginScreen';
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from './src/screens/components/HomeScreen'
import ProfileScreen from './src/screens/components/ProfileScreen'
import FavoritesScreen from './src/screens/components/FavoritesScreen';
import ProductsScreen from './src/screens/components/ProductsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const Stack = createStackNavigator();

function SepetScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Sepet</Text>
    </View>
  );
}


function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            <Text style={{ color: isFocused ? 'brown' : '#222' }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
});

export default function App() {
  const [favorites, setFavorites] = useState([]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
          <Tab.Screen
            name="Anasayfa"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 icon="fa-solid fa-house" />
              ),
            }}
          />
          <Tab.Screen
            name="Favorilerim"
            options={{
              tabBarLabel: 'Favorites',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="heart" color={color} size={30} />
              ),
            }}
          >
            {() => <FavoritesScreen favorites={favorites} />}
          </Tab.Screen>
          <Tab.Screen
            name="Ürünler"
            component={ProductsScreen}
            options={{
              tabBarLabel: 'Products',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cart" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen
            name="Sepetim"
            component={SepetScreen}
            options={{
              tabBarLabel: 'Sepet',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="basket" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen
            name="Profil Sayfası"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={30} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
