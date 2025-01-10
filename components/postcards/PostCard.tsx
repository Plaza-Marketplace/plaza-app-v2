import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ProfileIconSquare, ProfileIconCircle } from './PostIcon';
import ProductImage from './ProductCards/ProductImage';
import ProductShowcase from './ProductCards/ProductShowcase';
import ProductReview from './ProductCards/ProductReview';
import CaptionText from '../Texts/CaptionText';
import FocusedText from '../Texts/FocusedText';
import PlazaText from '../Texts/PlazaText';
import { PostCardType } from '@/constants/Types';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';
import { returnRatings } from '../PlazaIcons/RatingIcons';

interface PostCardProps {
  id: number;
  username: string;
  date: string;
  postName: string;
  postDesc: string;
  rating: number;
  type: PostCardType;
  isCommunityPost?: boolean;
}

const getPostComponent = (type: PostCardType) => {
  switch (type) {
    case PostCardType.POST:
      return null;
    case PostCardType.IMAGE:
      return <ProductImage />;
    case PostCardType.SHOWCASE:
      return <ProductShowcase />;
    case PostCardType.REVIEW:
      return <ProductReview />;
    default:
      return null;
  }
};

const PostCard = ({
  id,
  username,
  date,
  postName,
  postDesc,
  rating,
  type,
  isCommunityPost,
}: PostCardProps) => {
  return (
    <PressableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: 'modal',
          params: { postId: id, postName: postName },
        })
      }
    >
      <View style={styles.userInfoContainer}>
        {isCommunityPost ? (
          <ProfileIconSquare url="lole" />
        ) : (
          <ProfileIconCircle url="lole" />
        )}
        <View style={{ marginLeft: 5 }}>
          <CaptionText>{username}</CaptionText>
          <CaptionText style={{ marginTop: 3 }}>{date}</CaptionText>
        </View>
      </View>

      <View style={styles.sectionMargin}>
        <FocusedText>{postName}</FocusedText>
      </View>

      <View style={(styles.sectionMargin, styles.ratingContainer)}>
        {returnRatings(rating, 'small')}
      </View>

      <View style={styles.sectionMargin}>
        <PlazaText>{postDesc}</PlazaText>
      </View>

      <View style={styles.sectionMargin}>{getPostComponent(type)}</View>
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
