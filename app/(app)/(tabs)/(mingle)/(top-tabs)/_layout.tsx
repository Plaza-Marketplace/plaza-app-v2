import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import PlazaTabBar from '@/components/navigation/PlazaTabBar';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <MaterialTopTabs
      tabBar={({ ...props }) => (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: insets.top,
          }}
        >
          <PlazaTabBar {...props} />
        </View>
      )}
      screenOptions={{
        tabBarStyle: {
          width: '100%',
          alignSelf: 'center',
          backgroundColor: 'transparent',
        },
      }}
    >
      <MaterialTopTabs.Screen name="activity" options={{ title: 'Activity' }} />
      <MaterialTopTabs.Screen name="explore" options={{ title: 'Explore' }} />
      <MaterialTopTabs.Screen name="events" options={{ title: 'Events' }} />
    </MaterialTopTabs>
  );
}
