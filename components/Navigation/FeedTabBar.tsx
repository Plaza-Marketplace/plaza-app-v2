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
import { Basket } from '../Icons';

const Tab = createMaterialTopTabNavigator();

const FeedTabBar: FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  // const [menuVisible, setMenuVisible] = useState(false);

  const currentRoute = state.routes[state.index].name;

  return (
    <>
      <View
        style={[
          styles.tabBar,
          descriptors[state.routes[state.index].key]?.options?.tabBarStyle,
        ]}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          // if (route.name === 'More') {
          //   return (
          //     <Menu
          //       key={route.key}
          //       visible={menuVisible}
          //       onDismiss={() => setMenuVisible(false)}
          //       anchor={
          //         <TouchableOpacity
          //           onPress={() => setMenuVisible(true)}
          //           style={styles.tabButton}
          //         >
          //           <Text style={styles.tabText}>More ▼</Text>
          //         </TouchableOpacity>
          //       }
          //     >
          //       <Menu.Item
          //         onPress={() => {
          //           setMenuVisible(false);
          //           navigation.navigate('Settings');
          //         }}
          //         title="Settings"
          //       />
          //       <Divider />
          //       <Menu.Item
          //         onPress={() => {
          //           setMenuVisible(false);
          //           navigation.navigate('Profile');
          //         }}
          //         title="Profile"
          //       />
          //     </Menu>
          //   );
          // }

          if (route.name === 'feed') {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                style={[
                  styles.tabButton,
                  styles.shadow,
                  isFocused && styles.activeTabFeed,
                  index === 0 && { marginLeft: 0 },
                ]}
              >
                <Text
                  style={[styles.tabText, isFocused && styles.activeTextFeed]}
                >
                  {descriptors[route.key].options.title || route.name}
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={[
                styles.tabButton,
                styles.shadow,
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
          style={[styles.cartButton, styles.shadow]}
        >
          <Basket
            width={28}
            height={28}
            color={currentRoute === 'feed' ? Color.WHITE : Color.BLACK}
          />
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
    borderBottomColor: Color.BLACK,
  },
  activeTabFeed: {
    borderBottomWidth: 3,
    borderBottomColor: Color.WHITE,
  },
  tabText: {
    color: Color.NEUTRALS_DEFAULT,
    fontSize: 16,
  },
  activeText: {
    fontWeight: 'bold',
    color: Color.BLACK,
  },
  activeTextFeed: {
    fontWeight: 'bold',
    color: Color.WHITE,
  },
  cartButton: {
    position: 'absolute',
    right: Spacing.SPACING_3,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: Color.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
});
