import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Menu, Divider, Provider } from 'react-native-paper';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Tab = createMaterialTopTabNavigator();

const FeedTabBar: FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'transparent']}
        style={styles.background}
      />
      <View
        style={[
          styles.tabBar,
          descriptors[state.routes[state.index].key]?.options?.tabBarStyle,
        ]}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          if (route.name === 'More') {
            return (
              <Menu
                key={route.key}
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <TouchableOpacity
                    onPress={() => setMenuVisible(true)}
                    style={styles.tabButton}
                  >
                    <Text style={styles.tabText}>More ▼</Text>
                  </TouchableOpacity>
                }
              >
                <Menu.Item
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate('Settings');
                  }}
                  title="Settings"
                />
                <Divider />
                <Menu.Item
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate('Profile');
                  }}
                  title="Profile"
                />
              </Menu>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={[
                styles.tabButton,
                isFocused && styles.activeTab,
                index === 0 && { marginLeft: 0 },
              ]}
            >
              <Text style={[styles.tabText, isFocused && styles.activeText]}>
                {descriptors[route.key].options.title || route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          key={'cart'}
          onPress={() => router.push('/(app)/(tabs)/(marketplace)/cart')}
          style={[styles.cartButton]}
        >
          <Ionicons name="cart-outline" size={28} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FeedTabBar;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#333',
    marginTop: 10,
    paddingHorizontal: 10,
    position: 'relative',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: 140,
    zIndex: 1,
  },
  tabButton: {
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: Spacing.SPACING_5,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'orange',
  },
  tabText: {
    color: Color.WHITE,
    fontSize: 16,
  },
  activeText: {
    fontWeight: 'bold',
    color: Color.PRIMARY_DEFAULT,
  },
  cartButton: {
    position: 'absolute',
    right: Spacing.SPACING_3,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
