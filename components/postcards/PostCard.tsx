import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ProfileIconCircle } from './PostIcon';
import CaptionText from '../Texts/CaptionText';
import FocusedText from '../Texts/FocusedText';
import PlazaText from '../Texts/PlazaText';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';
import { returnRatings } from '../PlazaIcons/RatingIcons';
import { CommunityPost } from '@/models/communityPost';

interface PostCardProps {
  communityPost: CommunityPost;
}

const PostCard = ({ communityPost }: PostCardProps) => {
  const {
    id,
    communityId,
    posterId,
    title,
    description,
    postType,
    productId,
    imageUrl,
    productReviewId,
    sellerReviewId,
    createdAt,
  } = communityPost;
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
          <CaptionText>{posterId}</CaptionText>
          <CaptionText style={{ marginTop: 3 }}>{createdAt}</CaptionText>
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
