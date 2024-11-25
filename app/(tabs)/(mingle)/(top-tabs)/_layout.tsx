import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        <MaterialTopTabs.Screen name="chatter" options={{ title: 'Chatter' }} />
        <MaterialTopTabs.Screen
          name="communities"
          options={{ title: 'Communities' }}
        />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}
