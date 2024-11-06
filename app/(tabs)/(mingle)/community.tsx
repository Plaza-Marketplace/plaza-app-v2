import CommunityHeader from '@/components/Community/CommunityHeader';
import PlazaText from '@/components/Texts/PlazaText';
import { MOCK_COMMUNITIES } from '@/mocks';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const Community = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return <PlazaText>Something went wrong</PlazaText>;

  const communityId = parseInt(id);
  const community = MOCK_COMMUNITIES.find((c) => c.id === communityId);

  if (!community) return <PlazaText>Community not found</PlazaText>;

  return (
    <View>
      <CommunityHeader community={community} />
    </View>
  );
};

export default Community;
