import Add from '@/components/Buttons/Add';
import SmallCommunityCard from '@/components/Community/SmallCommunityCard';
import HeadingText from '@/components/Texts/HeadingText';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import useGetActivityTab from './useGetActivityTab';
import Post from '@/components/Community/Post';
import Color from '@/constants/Color';
import BodyText from '@/components/Texts/BodyText';
import Spacing from '@/constants/Spacing';

const Activity = () => {
  const { data, error } = useGetActivityTab();

  const handlePress = () => {
    router.push('/new-group');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ paddingTop: 16, gap: 16 }}>
        <HeadingText style={{ paddingHorizontal: 16 }} variant="h5-bold">
          Your Groups
        </HeadingText>
        <ScrollView
          horizontal
          contentContainerStyle={styles.cardsContainer}
          showsHorizontalScrollIndicator={false}
        >
          <Add onPress={handlePress} />
          {data?.yourGroups.map((group) => (
            <SmallCommunityCard
              key={group.id}
              id={group.id}
              iconUrl={group.iconUrl}
              name={group.name}
              memberCount={group.memberCount}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <HeadingText variant="h5-bold">Group Postings</HeadingText>
        {data?.groupPostings.map((post) => (
          <Post
            id={post.id}
            key={post.id}
            title={post.title}
            description={post.description}
            postType={post.postType}
            product={post.product}
            poster={post.poster}
            community={post.community}
            isOnCommunityPage={false}
          />
        ))}
        {data?.groupPostings.length === 0 && (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <HeadingText
              variant="h6-bold"
              style={{ textAlign: 'center', marginTop: Spacing.SPACING_5 }}
              color={Color.NEUTRALS_DEFAULT}
            >
              Your activity is empty!
            </HeadingText>

            <BodyText
              variant="lg"
              style={{ textAlign: 'center', marginTop: Spacing.SPACING_2 }}
              color={Color.NEUTRALS_DEFAULT}
            >
              Start by joining a group in the Explore tab. You'll be able to see
              all the posts from the communities you join here!
            </BodyText>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 24,
    paddingBottom: 16,
  },
  section: {
    gap: 16,
    paddingHorizontal: 16,
  },
  cardsContainer: {
    gap: 8,
    paddingHorizontal: 16,
  },
});
