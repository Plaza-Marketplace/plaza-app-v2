import { Event } from '@/analytics/utils';
import CommunityHeader from '@/components/Community/CommunityHeader';
import PlazaText from '@/components/Texts/PlazaText';
import useScreenTrack from '@/hooks/useScreenTrack';
import { useLocalSearchParams } from 'expo-router';
import { Tabs } from 'react-native-collapsible-tab-view';
import Collection from '@/screens/Plaza/Community/Collection';
import Posts from '@/screens/Plaza/Community/Posts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetCommunityPage } from '@/hooks/routes/community';
import CollapsibleTabBar from '@/components/Navigation/CollapsibleTabBar';

const Community = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const communityId = parseInt(id);

  const {
    data: communityPage,
    error,
    isLoading,
  } = useGetCommunityPage(communityId);

  useScreenTrack(Event.ENTERED_COMMUNITY, { communityId });

  const insets = useSafeAreaInsets();

  if (isLoading) return <PlazaText>Loading...</PlazaText>;

  if (!communityPage || error)
    return <PlazaText>Community not found</PlazaText>;

  return (
    <Tabs.Container
      renderHeader={() => (
        <CommunityHeader
          id={communityPage.id}
          name={communityPage.name}
          description={communityPage.description}
          iconUrl={communityPage.iconUrl}
          bannerUrl={communityPage.bannerUrl}
          memberCount={communityPage.memberCount}
          isMember={communityPage.isMember}
          ongoingEvent={communityPage.ongoingEvent}
        />
      )}
      renderTabBar={(props) => {
        return <CollapsibleTabBar {...props} />;
      }}
      containerStyle={{ zIndex: -1 }}
    >
      <Tabs.Tab name="Collection">
        <Collection
          communityId={communityId}
          isMember={communityPage.isMember}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Posts">
        <Posts communityId={communityId} />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default Community;
