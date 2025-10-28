import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './components/DashboardScreen';
import MetasScreen from './components/MetasScreen';
import TransacoesScreen from './components/TransacoesScreen';
import AlertasScreen from './components/AlertasScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: '#1e1e2f', paddingBottom: 5 },
            tabBarActiveTintColor: '#00bcd4',
            tabBarInactiveTintColor: '#ccc',
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="chart-line" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Metas"
            component={MetasScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="target" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Transações"
            component={TransacoesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="currency-usd" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Alertas"
            component={AlertasScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="alert-circle" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}