import { Event } from '@/analytics/utils';
import CommunityHeader from '@/components/Community/CommunityHeader';
import TopTabs, { TopTabsScreen } from '@/components/Navigation/TopTabs';
import PlazaText from '@/components/Texts/PlazaText';
import { useGetCommunityById } from '@/hooks/queries/useCommunity';
import useScreenTrack from '@/hooks/useScreenTrack';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const Community = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return <PlazaText>Something went wrong!</PlazaText>;

  const communityId = parseInt(id);
  const {
    data: community,
    error,
    isLoading,
  } = useGetCommunityById(communityId);

  useScreenTrack(Event.ENTERED_COMMUNITY, { communityId });

  if (isLoading) return <PlazaText>Loading...</PlazaText>;

  if (!community || error) return <PlazaText>Community not found</PlazaText>;

  return (
    <View>
      <CommunityHeader community={community} />
      <TopTabs>
        <TopTabsScreen name="community_collections" />
        <TopTabsScreen name="community_posts" />
      </TopTabs>
    </View>
  );
};

export default Community;
