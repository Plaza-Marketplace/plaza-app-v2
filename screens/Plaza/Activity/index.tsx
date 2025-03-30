import Add from '@/components/Buttons/Add';
import SmallCommunityCard from '@/components/Community/SmallCommunityCard';
import HeadingText from '@/components/Texts/HeadingText';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import useGetActivityTab from './useGetActivityTab';
import Post from '@/components/Community/Post';

const Activity = () => {
  const { data, error } = useGetActivityTab();

  const handlePress = () => {
    router.push('/new-group');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <HeadingText variant="h5-bold">Your Groups</HeadingText>
        <ScrollView horizontal contentContainerStyle={styles.cardsContainer}>
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
    padding: 16,
    gap: 24,
  },
  section: {
    gap: 16,
  },
  cardsContainer: {
    gap: 8,
    paddingBottom: 16,
  },
});
