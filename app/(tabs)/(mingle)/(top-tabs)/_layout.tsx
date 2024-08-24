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
        <MaterialTopTabs.Screen name="chatter" options={{ title: 'Chatter' }} />
        <MaterialTopTabs.Screen
          name="community"
          options={{ title: 'Community' }}
        />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}
