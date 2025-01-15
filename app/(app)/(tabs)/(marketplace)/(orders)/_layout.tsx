import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlazaTabBar from '@/components/Navigation/PlazaTabBar';
import { withLayoutContext } from 'expo-router';
import {
  createMaterialTopTabNavigator,
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

const OrdersLayout = () => {
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
            {/* <MaterialTopTabBar {...props} /> */}
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
        <MaterialTopTabs.Screen
          name="cart"
          options={{ title: 'Shopping Cart' }}
        />
        <MaterialTopTabs.Screen
          name="order-history"
          options={{ title: 'Order History' }}
        />
      </MaterialTopTabs>
    </SafeAreaView>
  );
};

export default OrdersLayout;
