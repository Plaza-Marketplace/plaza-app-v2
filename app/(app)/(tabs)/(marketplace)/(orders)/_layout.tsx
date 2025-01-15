import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialTopTabs } from '../(top-tabs)/_layout';
import PlazaTabBar from '@/components/Navigation/PlazaTabBar';
import Color from '@/constants/Color';

const OrdersLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.SURFACE_PRIMARY }}>
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
