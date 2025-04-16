import Add from '@/components/Buttons/Add';
import SmallCommunityCard from '@/components/Community/SmallCommunityCard';
import HeadingText from '@/components/Texts/HeadingText';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import useGetActivityTab from './useGetActivityTab';
import Post from '@/components/Community/Post';

const Activity = () => {
  const { data, error } = useGetActivityTab();
  console.log(data);
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
