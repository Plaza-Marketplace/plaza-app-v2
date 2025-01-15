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

  console.log(product?.seller?.id === undefined ? title : product.seller.id);

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

  return onPress ? (
    <>
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
            <CaptionText>@{poster.username}</CaptionText>
            <CaptionText style={{ marginTop: 3 }}>
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
          <View style={{ marginLeft: 5 }}>
            <CaptionText>@{poster.username}</CaptionText>
            <CaptionText style={{ marginTop: 3 }}>
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
