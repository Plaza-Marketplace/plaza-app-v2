import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ProfileIconSquare, ProfileIconCircle } from './PostIcon';
import ProductImage from './productcards/ProductImage';
import ProductShowcase from './productcards/ProductShowcase';
import ProductReview from './productcards/ProductReview';
import { FocusedText } from '../PlazaText';
import { PostCardType } from '@/constants/Types';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';

interface PostCardProps {
  username: string;
  date: string;
  postName: string;
  postDesc: string;
  rating: number;
  type: PostCardType;
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
  username,
  date,
  postName,
  postDesc,
  rating,
  type,
}: PostCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <ProfileIconSquare url="lole" />
        <View style={{ marginLeft: 5 }}>
          <Text>{username}</Text>
          <Text>{date}</Text>
        </View>
      </View>

      <View style={styles.sectionMargin}>
        <FocusedText>{postName}</FocusedText>
      </View>

      <View style={(styles.sectionMargin, styles.ratingContainer)}>
        {[...Array(5)].map(() => {
          for (let i = 0; i < 5; i++) {
            let element = null;
            if (rating - 1 >= 0) {
              rating -= 1;
              element = <MaterialCommunityIcons name={'star'} size={20} />;
            } else if (rating - 0.5 >= 0) {
              rating -= 0.5;
              element = (
                <MaterialCommunityIcons name={'star-half-full'} size={20} />
              );
            } else {
              element = (
                <MaterialCommunityIcons name={'star-outline'} size={20} />
              );
            }
            return element;
          }
        })}
      </View>

      <View style={styles.sectionMargin}>
        <Text>{postDesc}</Text>
      </View>

      <View style={styles.sectionMargin}>{getPostComponent(type)}</View>
    </View>
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
