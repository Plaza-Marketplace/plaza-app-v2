import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ProfileIconSquare, ProfileIconCircle } from './PostIcon';
import ProductImage from './productcards/ProductImage';
import ProductShowcase from './productcards/ProductShowcase';
import ProductReview from './productcards/ProductReview';
import { CaptionText, FocusedText, PlazaText } from '../PlazaText';
import { PostCardType } from '@/constants/Types';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';

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
  let ratingCopy = rating;
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
        {[...Array(5)].map((_, index) => {
          for (let i = 0; i < 5; i++) {
            let element = null;
            if (ratingCopy - 1 >= 0) {
              ratingCopy -= 1;
              element = (
                <MaterialCommunityIcons
                  name={'star'}
                  size={20}
                  key={`${date}-full-${index}`}
                />
              );
            } else if (ratingCopy - 0.5 >= 0) {
              ratingCopy -= 0.5;
              element = (
                <MaterialCommunityIcons
                  name={'star-half-full'}
                  size={20}
                  key={`${date}-half-${index}`}
                />
              );
            } else {
              element = (
                <MaterialCommunityIcons
                  name={'star-outline'}
                  size={20}
                  key={`${date}-empty-${index}`}
                />
              );
            }
            return element;
          }
        })}
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
