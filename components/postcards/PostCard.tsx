import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { ProfileIconCircle } from './PostIcon';
import CaptionText from '../Texts/CaptionText';
import FocusedText from '../Texts/FocusedText';
import PlazaText from '../Texts/PlazaText';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';
import { returnRatings } from '../PlazaIcons/RatingIcons';
import { ChatterCommunityPost, PostType } from '@/models/communityPost';
import { formatDatetime } from '@/utils/datetime';
import ProductReview from './ProductCards/ProductReview';
import ProductShowcase from './ProductCards/ProductShowcase';

interface PostCardProps {
  communityPost: ChatterCommunityPost;
}

const PostCard = ({ communityPost }: PostCardProps) => {
  const {
    id,
    community,
    poster,
    title,
    description,
    postType,
    product,
    productReview,
    sellerReview,
    createdAt,
  } = communityPost;

  console.log('communityPost', communityPost);

  let additionalComponent = null;

  switch (postType) {
    case PostType.REVIEW:
      if (!product) {
        return <Text>Something went wrong</Text>;
      }
      additionalComponent = <ProductReview product={product} />;
      break;
    case PostType.SHOWCASE:
      if (!product) {
        return <Text>Something went wrong</Text>;
      }
      additionalComponent = <ProductShowcase product={product} />;
      break;
    case PostType.POST:
    default:
      break;
  }

  return (
    <PressableOpacity
      style={styles.container}
      onPress={() =>
        router.navigate({
          pathname: '/post-modal',
          params: { postId: id, postName: title },
        })
      }
    >
      <View style={styles.userInfoContainer}>
        <ProfileIconCircle url="lole" />
        <View style={{ marginLeft: 5 }}>
          <CaptionText>{poster.username}</CaptionText>
          <CaptionText style={{ marginTop: 3 }}>
            {formatDatetime(createdAt)}
          </CaptionText>
        </View>
      </View>

      <View style={styles.sectionMargin}>
        <FocusedText>{title}</FocusedText>
      </View>

      <View style={(styles.sectionMargin, styles.ratingContainer)}>
        {returnRatings(0, 'small')}
      </View>

      <View style={styles.sectionMargin}>
        <PlazaText>{description}</PlazaText>
      </View>

      <View style={styles.sectionMargin}></View>

      {additionalComponent}
    </PressableOpacity>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
  },
  sectionMargin: {
    marginTop: 5,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});
