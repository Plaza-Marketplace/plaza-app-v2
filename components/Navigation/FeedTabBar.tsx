import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Basket } from '../Icons';
import { anonymousLogout } from '@/screens/Anonymous/services';
import PressableOpacity from '../Buttons/PressableOpacity';

const Tab = createMaterialTopTabNavigator();

interface Props extends MaterialTopTabBarProps {
  showCart?: boolean;
  showLoginPrompt?: boolean;
}

const FeedTabBar: FC<Props> = ({
  state,
  descriptors,
  navigation,
  showCart,
  showLoginPrompt,
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
          //         <PressableOpacity
          //           onPress={() => setMenuVisible(true)}
          //           style={styles.tabButton}
          //         >
          //           <Text style={styles.tabText}>More ▼</Text>
          //         </PressableOpacity>
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
          console.log(route.name);
          if (route.name === 'events') {
            return (
              <View
                key={route.key}
                style={{
                  gap: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <PressableOpacity
                  onPress={() => navigation.navigate(route.name)}
                  style={[
                    styles.tabButton,
                    styles.shadow,
                    isFocused && styles.activeTab,
                    index === 0 && { marginLeft: 0 },
                  ]}
                >
                  <Text
                    style={[styles.tabText, isFocused && styles.activeText]}
                  >
                    {descriptors[route.key].options.title || route.name}
                  </Text>
                </PressableOpacity>
              </View>
            );
          }

          if (route.name === 'feed') {
            return (
              <PressableOpacity
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
              </PressableOpacity>
            );
          }

          return (
            <PressableOpacity
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
            </PressableOpacity>
          );
        })}
        {showCart && (
          <PressableOpacity
            key={'cart'}
            onPress={() => router.push('/(app)/(tabs)/(marketplace)/cart')}
            style={[styles.cartButton, styles.shadow]}
          >
            <Basket
              width={28}
              height={28}
              color={
                currentRoute === 'feed' ? Color.WHITE : Color.PRIMARY_DEFAULT
              }
            />
          </PressableOpacity>
        )}
        {showLoginPrompt && (
          <PressableOpacity
            onPress={async () => await anonymousLogout()}
            style={[styles.cartButton, styles.shadow]}
          >
            <Ionicons
              name="log-in-outline"
              size={28}
              color={
                currentRoute === 'feed' ? Color.WHITE : Color.PRIMARY_DEFAULT
              }
            />
          </PressableOpacity>
        )}
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
    borderBottomWidth: 0,
    borderBottomColor: Color.PRIMARY_DEFAULT,
  },
  activeTabFeed: {
    borderBottomWidth: 0,
    borderBottomColor: Color.WHITE,
  },
  tabText: {
    color: Color.NEUTRALS_DEFAULT,
    fontSize: 16,
  },
  activeText: {
    fontWeight: 'bold',
    color: Color.PRIMARY_DEFAULT,
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
