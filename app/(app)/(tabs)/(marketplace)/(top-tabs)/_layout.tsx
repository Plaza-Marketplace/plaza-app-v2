import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { View } from 'react-native';
import { TabBarIcon } from '@/components/Navigation/TabBarIcon';
import { router } from 'expo-router';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  return (
    <MaterialTopTabs
      tabBar={({ ...props }) => (
        <SafeAreaView
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: 99,
          }}
        >
          <View>
            <MaterialTopTabBar {...props} />
            <TabBarIcon
              name="cart"
              color="black"
              style={{ position: 'absolute', right: 20, top: 50 }}
              onPress={() => router.push('/cart')}
            />
          </View>
        </SafeAreaView>
      )}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <MaterialTopTabs.Screen name="index" options={{ title: 'Explore' }} />
      <MaterialTopTabs.Screen
        name="following"
        options={{ title: 'Following' }}
      />
    </MaterialTopTabs>
  );
}
