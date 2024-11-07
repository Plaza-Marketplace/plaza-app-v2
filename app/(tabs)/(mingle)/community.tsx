import PressableOpacity from '@/components/Buttons/PressableOpacity';
import CommunityHeader from '@/components/Community/CommunityHeader';
import CommunityProductImage from '@/components/Community/CommunityProductImage';
import PlazaText from '@/components/Texts/PlazaText';
import SubheaderText from '@/components/Texts/SubheaderText';
import Color from '@/constants/Color';
import { MOCK_COMMUNITIES, MOCK_COMMUNITY_PRODUCTS } from '@/mocks';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

const Community = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return <PlazaText>Something went wrong</PlazaText>;

  const communityId = parseInt(id);
  const community = MOCK_COMMUNITIES.find((c) => c.id === communityId);

  if (!community) return <PlazaText>Community not found</PlazaText>;

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
    <View style={{ flex: 1 }}>
      <View style={styles.info}>
        <CommunityHeader community={community} />
        <View style={styles.header}>
          <PressableOpacity
            style={{
              alignItems: 'center',

              flex: 1,
            }}
          >
            <SubheaderText>Collection</SubheaderText>
          </PressableOpacity>
          <PressableOpacity style={{ flex: 1, alignItems: 'center' }}>
            <SubheaderText>Posts</SubheaderText>
          </PressableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.columnContainer}>
        <View style={styles.column}>
          {leftColumn.map((communityProduct) => (
            <CommunityProductImage communityProduct={communityProduct} />
          ))}
        </View>
        <View style={styles.column}>
          {rightColumn.map((communityProduct) => (
            <CommunityProductImage communityProduct={communityProduct} />
          ))}
        </View>
      </ScrollView>
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
