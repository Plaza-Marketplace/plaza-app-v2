import Radius from '@/constants/Radius';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import UserInfo from '../UserInfo';
import { PostType } from '@/models/communityPost';
import GroupIcon from './GroupIcon';
import BodyText from '../Texts/BodyText';
import Color from '@/constants/Color';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';
import ProductActivityCard from '../Product/ProductActivityCard';

interface PostProps {
  title: string;

  description: string;

  postType: PostType;

  product: {
    id: Id;

    name: string;

    thumbnailUrl: Url | null;

    seller: {
      id: Id;

      username: string;

      profilePictureUrl: Url | null;

      averageRating: number;
    };
  } | null;

  poster: {
    id: Id;

    username: string;

    profilePictureUrl: Url | null;
  };

  community: {
    id: Id;

    name: string;

    iconUrl: Url | null;
  };

  isOnCommunityPage: boolean;
}

const Post: FC<PostProps> = ({
  title,
  description,
  postType,
  product,
  poster,
  community,
  isOnCommunityPage,
}) => {
  return (
    <View style={styles.container}>
      {isOnCommunityPage ? (
        <UserInfo
          username={poster.username}
          profilePictureUrl={poster.profilePictureUrl}
        />
      ) : (
        <View style={styles.infoContainer}>
          <GroupIcon id={community.id} size={32} url={community.iconUrl} />
          <View>
            <PressableOpacity
              onPress={() =>
                router.push({
                  pathname: '/community',
                  params: { id: community.id },
                })
              }
            >
              <BodyText variant="sm-medium">{community.name}</BodyText>
            </PressableOpacity>
            <BodyText variant="sm" color={Color.NEUTRALS_DEFAULT}>
              @{poster.username}
            </BodyText>
          </View>
        </View>
      )}
      <BodyText variant="lg-bold">{title}</BodyText>
      <BodyText variant="md">{description}</BodyText>
      {product && (
        <ProductActivityCard
          id={product.id}
          name={product.name}
          seller={product.seller}
          thumbnailUrl={product.thumbnailUrl}
        />
      )}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    gap: 4,
    backgroundColor: Color.NEUTRALS_WHITE,
    padding: 16,
    borderRadius: Radius.ROUNDED,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
