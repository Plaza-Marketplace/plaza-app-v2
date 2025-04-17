import PlazaHeader from '@/components/PlazaHeader';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useGetFullPost } from './hooks';
import Post from '@/components/Community/Post';
import ExitButton from '@/components/Buttons/ExitButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from '@/constants/Color';

interface FullPostProps {
  id: Id;
}

const FullPost: FC<FullPostProps> = ({ id }) => {
  const { data, error } = useGetFullPost(id);

  if (!data) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ExitButton />
      <Post
        id={data.id ?? 0}
        title={data.title ?? ''}
        description={data.description ?? ''}
        postType={data.postType ?? 'TEXT'}
        product={data.product ?? null}
        poster={data.poster}
        community={data.community}
        isOnCommunityPage={false}
        isPressable={false}
      />
    </SafeAreaView>
  );
};

export default FullPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
    gap: 16,
    padding: 16,
  },
});
