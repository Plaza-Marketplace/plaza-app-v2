import Color from '@/constants/Color';
import { MARKETPLACE_FEED_VIDEO_HEIGHT } from '@/constants/marketplace';
import { useVideoPlayer, VideoView } from 'expo-video';
import { FC, useCallback, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import BoldSubheaderText from '../Texts/BoldSubheaderText';
import ProfileIcon from '../ProfileIcon';
import Spacing from '@/constants/Spacing';
import FeedVideoButton from '../FeedVideoButton';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router, useFocusEffect } from 'expo-router';
import ReviewModal from './ReviewModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ExpandableDescription from '../ExpandableDescription';
import Products from './Products';
import CommentModal from './CommentModal';
import LikeButton from './LikeButton';
import { Video } from '@/models/video';

interface FeedVideoProps {
  video: Video;
  visible: boolean;
}

const FeedVideo: FC<FeedVideoProps> = ({ video, visible }) => {
  const reviewModalRef = useRef<BottomSheetModal>(null);
  const commentModalRef = useRef<BottomSheetModal>(null);

  const player = useVideoPlayer(video.videoUrl, (player) => {
    player.loop = true;
    player.play();
  });

  useFocusEffect(
    useCallback(() => {
      if (visible) {
        player.replay();
        player.play();
      }

      return () => player.pause();
    }, [player, visible])
  );

  if (visible) {
    player.replay();
    player.play();
  } else {
    player.pause();
  }

  return (
    <>
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
                  router.push({
                    pathname: '/profile-modal',
                    params: { id: video.poster.id },
                  })
                }
                style={styles.userInfoContainer}
              >
                <ProfileIcon variant="user" />
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
      <ReviewModal bottomSheetRef={reviewModalRef} />
      <CommentModal bottomSheetRef={commentModalRef} />
    </>
  );
};

export default FeedVideo;

const styles = StyleSheet.create({
  videoContainer: {
    width: Dimensions.get('window').width,
    height: MARKETPLACE_FEED_VIDEO_HEIGHT,
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
