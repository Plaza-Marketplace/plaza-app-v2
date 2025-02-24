import { Event, track } from '@/analytics/utils';
import CommunityHeader from '@/components/Community/CommunityHeader';
import PlazaText from '@/components/Texts/PlazaText';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { useGetCommunityById } from '@/hooks/queries/useCommunity';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { useLocalSearchParams, withLayoutContext } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Community = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return <PlazaText>Something went wrong</PlazaText>;

  const communityId = parseInt(id);

  const {
    data: community,
    error,
    isPending,
  } = useGetCommunityById(communityId);

  useEffect(() => {
    track(Event.ENTERED_COMMUNITY, { communityId });
  }, []);

  if (isPending) return <PlazaText>Loading...</PlazaText>;

  if (!community || error) return <PlazaText>Community not found</PlazaText>;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <CommunityHeader community={community} />
      <MaterialTopTabs
        tabBar={({ ...props }) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* <PlazaTabBar {...props} /> */}
            <MaterialTopTabBar {...props} />
          </View>
        )}
        screenOptions={{
          tabBarStyle: {
            width: '100%',
            alignSelf: 'center',
            backgroundColor: 'transparent',
          },
        }}
        backBehavior="none"
      >
        <MaterialTopTabs.Screen
          name="community_collections"
          options={{ title: 'Collections' }}
          initialParams={{ communityId: communityId }}
        />
        <MaterialTopTabs.Screen
          name="community_posts"
          options={{ title: 'Posts' }}
          initialParams={{ communityId: communityId }}
        />
      </MaterialTopTabs>
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({
  columnContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: Spacing.SPACING_2,
    gap: Spacing.SPACING_2,
    backgroundColor: Color.SURFACE_PRIMARY,
  },
  column: {
    flex: 1,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.SPACING_2,
  },
  info: {
    backgroundColor: Color.SURFACE_PRIMARY,
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
});
