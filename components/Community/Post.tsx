import Radius from '@/constants/Radius';
import { FC, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import UserInfo from '../User/UserInfo';
import { PostType } from '@/models/communityPost';
import GroupIcon from './GroupIcon';
import BodyText from '../Texts/BodyText';
import Color from '@/constants/Color';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';
import ProductActivityCard from '../Product/ProductActivityCard';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import MenuModal from '../Menu';
import { Ionicons } from '@expo/vector-icons';
import Spacing from '@/constants/Spacing';
import MenuButton from '../Menu/MenuButton';
import PostReportModal from '../Report/CommunityReportModal/PostReportModal';

interface PostProps {
  id: Id;

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

  isPressable?: boolean;
}

const Post: FC<PostProps> = ({
  id,
  title,
  description,
  postType,
  product,
  poster,
  community,
  isOnCommunityPage,
  isPressable = true,
}) => {
  const handlePress = () => {
    router.push({
      pathname: '/post-modal',
      params: { postId: id },
    });
  };

  const menuRef = useRef<BottomSheetModal>(null);
  const reportRef = useRef<BottomSheetModal>(null);

  const Container = isPressable ? PressableOpacity : View;

  return (
    <>
      <Container style={styles.container} onPress={handlePress}>
        <PressableOpacity
          style={{
            position: 'absolute',
            top: Spacing.SPACING_3,
            right: Spacing.SPACING_3,
            zIndex: 9999,
          }}
          onPress={() => menuRef.current?.present()}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color={Color.NEUTRALS_DEFAULT}
          />
        </PressableOpacity>
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
              <PressableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/profile-modal',
                    params: { id: poster.id },
                  })
                }
              >
                <BodyText variant="sm" color={Color.NEUTRALS_DEFAULT}>
                  @{poster.username}
                </BodyText>
              </PressableOpacity>
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
      </Container>
      <MenuModal bottomSheetRef={menuRef}>
        <MenuButton
          title="Report Post"
          icon={
            <Ionicons
              name="warning-outline"
              size={20}
              color={Color.NEUTRALS_DEFAULT}
            />
          }
          onPress={() => {
            reportRef.current?.present();
          }}
        />
      </MenuModal>
      <PostReportModal
        bottomSheetRef={reportRef}
        communityId={community.id}
        postId={id}
      />
    </>
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
