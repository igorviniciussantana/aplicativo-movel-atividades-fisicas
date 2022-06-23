import 'react-native-gesture-handler';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AtividadesScreen from './componentes/AtividadesScreen';
import HomeScreen from './componentes/HomeScreen';
import Profile from './componentes/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();



function App(){
  
    return (
<NavigationContainer>

      <Tab.Navigator screenOptions={{
    tabBarStyle: { backgroundColor: '#00FBAB'},
    tabBarLabelStyle:{ color: '#1B1537', fontFamily: 'Poppins', fontWeight: '600',  borderWidth: '0',
    borderColor: '#1B1537'},
  }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#1B1537',
          },
          headerTintColor: '#00FBAB',
          headerTitleStyle: {
            fontWeight: '500',
            fontFamily: 'Poppins',
          },
          tabBarIcon: () => (
            < MaterialCommunityIcons name="home" color='#1B1537' size='30px'/>
          )
        }}/>
      <Tab.Screen name="Atividades" component={AtividadesScreen} 
      options={{
        title: 'Atividades',
        headerStyle: {
          backgroundColor: '#1B1537',
        },
        headerTintColor: '#00FBAB',
        headerTitleStyle: {
          fontWeight: '500',
          fontFamily: 'Poppins',
        },
        tabBarIcon: () => (
          < MaterialCommunityIcons name="weight-lifter" color='#1B1537' size='30px'/>
        )
      }}
      />
      <Tab.Screen name="Perfil" component={Profile} 
      options={{
        title: 'Perfil',
        headerStyle: {
          backgroundColor: '#1B1537',
        },
        headerTintColor: '#00FBAB',
        headerTitleStyle: {
          fontWeight: '500',
          fontFamily: 'Poppins',
        },
        tabBarIcon: () => (
          < MaterialCommunityIcons name="account" color='#1B1537' size='30px'/>
        )
      }}
      
      />
    </Tab.Navigator>
</NavigationContainer>


      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen
      //       name="Home"
      //       component={HomeScreen}
      //     />
          
      //     <Stack.Screen
      //       name="Atividades"
      //       component={AtividadesScreen}
      //     />
      //   </Stack.Navigator>
      // </NavigationContainer>
    );
  }

export default App;