import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/routers';
import { withLayoutContext } from 'expo-router';
import PlazaTabBar from './PlazaTabBar';
import { FC, ReactNode } from 'react';

export const createPlazaTopTabNavigator = () => {
  const { Navigator } = createMaterialTopTabNavigator();

  return withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
  >(Navigator);
};

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

interface TopTabsProps {
  children?: ReactNode;
}

const TopTabs: FC<TopTabsProps> = ({ children }) => {
  return (
    <MaterialTopTabs tabBar={PlazaTabBar} backBehavior="none">
      {children}
    </MaterialTopTabs>
  );
};

export default TopTabs;

export const TopTabsScreen = MaterialTopTabs.Screen;
