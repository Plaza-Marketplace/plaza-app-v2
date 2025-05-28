import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withLayoutContext } from 'expo-router';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
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
import { useAuth } from '@/contexts/AuthContext';
import FeedTabBar from '@/components/Navigation/FeedTabBar';

const FeedTopTabs = () => {
  const inset = useSafeAreaInsets();
  const { session } = useAuth();
  const isAnonymous = session?.user.is_anonymous;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.SURFACE_PRIMARY,
      }}
    >
      <MaterialTopTabs
        tabBar={({ ...props }) => (
          <FeedTabBar
            showCart={!isAnonymous}
            showLoginPrompt={isAnonymous}
            {...props}
          />
        )}
        screenOptions={{
          tabBarStyle: {
            width: '100%',
            alignSelf: 'center',
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 9999,
            top: inset.top,
          },
        }}
      >
        <MaterialTopTabs.Screen name="feed" options={{ title: 'For You' }} />
        <MaterialTopTabs.Screen name="catalog" options={{ title: 'Catalog' }} />
      </MaterialTopTabs>
    </View>
  );
};

export default FeedTopTabs;

// const styles = StyleSheet.create({});
