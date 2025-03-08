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
import Color from '@/constants/Color';
import CartScreen from './cart';
import PlazaHeader from '@/components/PlazaHeader';

const OrdersLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.SURFACE_PRIMARY }}>
      <PlazaHeader name="Shopping Cart" accountForSafeArea={false} />
      <CartScreen />
    </SafeAreaView>
  );
};

export default OrdersLayout;
