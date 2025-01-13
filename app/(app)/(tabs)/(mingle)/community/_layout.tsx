import CommunityHeader from '@/components/Community/CommunityHeader';
import PlazaText from '@/components/Texts/PlazaText';
import Color from '@/constants/Color';
import { useGetCommunityById } from '@/hooks/queries/useCommunity';
import { MOCK_COMMUNITY_PRODUCTS } from '@/mocks';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { useLocalSearchParams, withLayoutContext } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

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

  if (isPending) return <PlazaText>Loading...</PlazaText>;

  if (!community || error) return <PlazaText>Community not found</PlazaText>;

  const communityProducts = MOCK_COMMUNITY_PRODUCTS;

  const leftColumn = [];
  const rightColumn = [];

  for (let i = 0; i < communityProducts.length; i++) {
    if (i % 2 === 0) {
      leftColumn.push(communityProducts[i]);
    } else {
      rightColumn.push(communityProducts[i]);
    }
  }

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
    padding: 8,
    gap: 8,
    backgroundColor: Color.SURFACE_PRIMARY,
  },
  column: {
    flex: 1,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
  },
  info: {
    backgroundColor: Color.SURFACE_PRIMARY,
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
});
