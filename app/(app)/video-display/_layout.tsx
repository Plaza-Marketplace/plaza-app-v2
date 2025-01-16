import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusHeader from '@/components/FocusHeader';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useGetVideoById } from '@/hooks/queries/useVideo';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useVideoPlayer, VideoView } from 'expo-video';
import Products from '@/components/Feed/Products';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import ProfileIcon from '@/components/ProfileIcon';
import BoldSubheaderText from '@/components/Texts/BoldSubheaderText';
import ExpandableDescription from '@/components/ExpandableDescription';
import LikeButton from '@/components/Feed/LikeButton';
import FeedVideoButton from '@/components/FeedVideoButton';
import ReviewModal from '@/components/Feed/ReviewModal';
import CommentModal from '@/components/Feed/CommentModal';

const VideoDisplay = () => {
  const { videoId } = useLocalSearchParams<{ videoId: string }>();
  const { data: video, isLoading } = videoId
    ? useGetVideoById(parseInt(videoId))
    : { data: null, isLoading: false };

  const reviewModalRef = useRef<BottomSheetModal>(null);
  const commentModalRef = useRef<BottomSheetModal>(null);

  const player = useVideoPlayer(video ? video.videoUrl : '', (player) => {
    player.loop = true;
    player.play();
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!video) {
    return <Text>Video not found</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <FocusHeader name="Video" />
      <View style={{ flex: 1 }}>
        <VideoView
          style={styles.videoContainer}
          player={player}
          nativeControls={false}
        >
          <View style={styles.infoButtonsContainer}>
            <View style={styles.videoInfoContainer}>
              <Products sellerId={video.poster.id} products={video.products} />
              <View style={styles.infoTextContainer}>
                <PressableOpacity
                  onPress={() =>
                    router.replace({
                      pathname: '/profile-modal',
                      params: { id: video.poster.id },
                    })
                  }
                  style={styles.userInfoContainer}
                >
                  <ProfileIcon
                    variant="user"
                    url={video.poster.profileImageUrl || undefined}
                  />
                  <BoldSubheaderText>{video.poster.username}</BoldSubheaderText>
                </PressableOpacity>
                {video.description && (
                  <ExpandableDescription description={video.description} />
                )}
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <LikeButton videoId={video.id} likeCount={video.likeCount} />
              <FeedVideoButton
                name="review"
                count={video.reviewCount}
                onPress={() => {
                  reviewModalRef.current?.present();
                  reviewModalRef.current?.expand();
                }}
              />
              <FeedVideoButton
                name="comment"
                count={video.commentCount}
                onPress={() => {
                  commentModalRef.current?.present();
                  commentModalRef.current?.expand();
                }}
              />
              <FeedVideoButton name="share" onPress={() => {}} />
            </View>
          </View>
        </VideoView>
        <ReviewModal
          bottomSheetRef={reviewModalRef}
          seller={video.poster}
          product={video.products[0]}
        />
        <CommentModal bottomSheetRef={commentModalRef} videoId={video.id} />
      </View>
    </SafeAreaView>
  );
};

export default VideoDisplay;

const styles = StyleSheet.create({
  videoContainer: {
    width: Dimensions.get('window').width,
    flex: 1,
    backgroundColor: Color.SURFACE_PRIMARY,
    justifyContent: 'flex-end',
  },
  infoButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: Spacing.SPACING_3,
    gap: Spacing.SPACING_2,
    justifyContent: 'space-between',
  },
  videoInfoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: Spacing.SPACING_3,
  },
  infoTextContainer: {
    gap: Spacing.SPACING_1,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.SPACING_2,
  },
  buttonsContainer: {
    justifyContent: 'flex-end',
    gap: Spacing.SPACING_3,
  },
});
