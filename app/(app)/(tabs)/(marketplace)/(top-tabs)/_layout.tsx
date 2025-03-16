import { View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import PlazaTabBar from '@/components/Navigation/PlazaTabBar';
import { withLayoutContext } from 'expo-router';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);
import Color from '@/constants/Color';

const FeedTopTabs = () => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.SURFACE_PRIMARY,
        position: 'relative',
      }}
    >
      <MaterialTopTabs
        tabBar={({ ...props }) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              zIndex: 1000,
              top: inset.top,
            }}
          >
            <MaterialTopTabBar {...props} />
          </View>
        )}
        screenOptions={{
          tabBarStyle: {
            width: '100%',
            alignSelf: 'center',
            backgroundColor: 'transparent',
          },
        }}
        initialRouteName="feed"
      >
        <MaterialTopTabs.Screen name="feed" options={{ title: 'For You' }} />
        <MaterialTopTabs.Screen name="(orders)" options={{ title: 'Orders' }} />
      </MaterialTopTabs>
    </View>
  );
};

export default FeedTopTabs;

// const styles = StyleSheet.create({});
