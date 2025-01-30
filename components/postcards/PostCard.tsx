import { StyleSheet, View, Text } from 'react-native';
import React, { useRef } from 'react';
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
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ProductModal from '../Feed/ProductModal';
import { Event, track } from '@/analytics/utils';
import Spacing from '@/constants/Spacing';

interface PostCardProps {
  communityPost: ChatterCommunityPost;
  onPress?: () => void;
}

const PostCard = ({ onPress, communityPost }: PostCardProps) => {
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
  const productModalRef = useRef<BottomSheetModal>(null);

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
      additionalComponent = (
        <PressableOpacity onPress={() => productModalRef.current?.present()}>
          <ProductShowcase product={product} />
        </PressableOpacity>
      );
      break;
    case PostType.POST:
    default:
      break;
  }

  const handleOnPress = () => {
    router.navigate({
      pathname: '/post-modal',
      params: { postId: id, postName: title },
    });
    track(Event.CLICKED_POST, { postId: id });
  };

  return onPress ? (
    <>
      <PressableOpacity style={styles.container} onPress={handleOnPress}>
        <View style={styles.userInfoContainer}>
          <ProfileIconCircle url="lole" />
          <View style={{ marginLeft: Spacing.SPACING_1 }}>
            <CaptionText>@{poster.username}</CaptionText>
            <CaptionText style={{ marginTop: Spacing.SPACING_1 }}>
              {formatDatetime(createdAt)}
            </CaptionText>
          </View>
        </View>

        <View style={styles.sectionMargin}>
          <FocusedText>{title}</FocusedText>
        </View>

        {postType === PostType.REVIEW && (
          <View style={(styles.sectionMargin, styles.ratingContainer)}>
            {returnRatings(0, 'small')}
          </View>
        )}

        <View style={styles.sectionMargin}>
          <PlazaText>{description}</PlazaText>
        </View>

        <View style={styles.sectionMargin}></View>

        {additionalComponent}
      </PressableOpacity>
      {!!communityPost.product && (
        <ProductModal
          product={{
            ...communityPost.product,
            sellerId: communityPost.product.seller?.id,
          }}
          bottomSheetRef={productModalRef}
        />
      )}
    </>
  ) : (
    <>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <ProfileIconCircle url="lole" />
          <View style={{ marginLeft: Spacing.SPACING_1 }}>
            <CaptionText>@{poster.username}</CaptionText>
            <CaptionText style={{ marginTop: Spacing.SPACING_1 }}>
              {formatDatetime(createdAt)}
            </CaptionText>
          </View>
        </View>

        <View style={styles.sectionMargin}>
          <FocusedText>{title}</FocusedText>
        </View>

        {postType === PostType.REVIEW && (
          <View style={(styles.sectionMargin, styles.ratingContainer)}>
            {returnRatings(0, 'small')}
          </View>
        )}

        <View style={styles.sectionMargin}>
          <PlazaText>{description}</PlazaText>
        </View>

        <View style={styles.sectionMargin}></View>

        {additionalComponent}
      </View>
      {!!communityPost.product && (
        <ProductModal
          product={{
            ...communityPost.product,
            sellerId: communityPost.product.seller?.id,
          }}
          bottomSheetRef={productModalRef}
        />
      )}
    </>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: Spacing.SPACING_2,
  },
  sectionMargin: {
    marginTop: Spacing.SPACING_1,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});
