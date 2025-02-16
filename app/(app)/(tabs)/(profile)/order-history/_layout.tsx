import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PlazaTabBar from '@/components/Navigation/PlazaTabBar';
import { router, withLayoutContext } from 'expo-router';
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
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { BackButton } from '@/components/PlazaIcons/ActionIcons';
import Spacing from '@/constants/Spacing';

const OrdersLayout = () => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.SURFACE_PRIMARY,
        paddingTop: inset.top,
      }}
    >
      <MaterialTopTabs
        tabBar={({ ...props }) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <PressableOpacity
              style={styles.buttonStyle}
              onPress={() => router.back()}
            >
              <BackButton color={Color.GREY_500} />
            </PressableOpacity>
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
        <MaterialTopTabs.Screen
          name="purchases"
          options={{ title: 'My Purchases' }}
        />
        <MaterialTopTabs.Screen name="sales" options={{ title: 'My Sales' }} />
      </MaterialTopTabs>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    left: Spacing.SPACING_2,
    paddingVertical: Spacing.SPACING_1,
    zIndex: 99,
  },
});

export default OrdersLayout;
