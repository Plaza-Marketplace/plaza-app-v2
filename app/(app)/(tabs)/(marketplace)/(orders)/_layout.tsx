import { View } from 'react-native';
import { MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialTopTabs } from '../(top-tabs)/_layout';
import PlazaTabBar from '@/components/Navigation/PlazaTabBar';

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
