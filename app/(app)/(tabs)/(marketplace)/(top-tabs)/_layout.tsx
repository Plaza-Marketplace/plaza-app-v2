import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={{ flex: 1 }}>
      <MaterialTopTabs
        tabBar={({ ...props }) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialTopTabBar {...props} />
            <TabBarIcon
              name="cart"
              color="black"
              style={{ position: 'absolute', right: 20 }}
              onPress={() => router.push('cart')}
            />
          </View>
        )}
        screenOptions={{
          tabBarStyle: {
            width: '70%',
            alignSelf: 'center',
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
    </SafeAreaView>
  );
}
