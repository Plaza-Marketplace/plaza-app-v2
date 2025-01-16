import Color from '@/constants/Color';
import { MARKETPLACE_FEED_VIDEO_HEIGHT } from '@/constants/marketplace';
import { useVideoPlayer, VideoView } from 'expo-video';
import { FC, useCallback, useEffect, useRef } from 'react';
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
import AddToCommunityCollectionModal from './AddToCommunityCollectionModal';
import { useEvent } from 'expo';

interface FeedVideoProps {
  video: Video;
  visible: boolean;
}

const FeedVideo: FC<FeedVideoProps> = ({ video, visible }) => {
  const reviewModalRef = useRef<BottomSheetModal>(null);
  const commentModalRef = useRef<BottomSheetModal>(null);
  const addToCommunityCollectionModalRef = useRef<BottomSheetModal>(null);

  const player = useVideoPlayer(video.videoUrl, (player) => {
    player.loop = true;
    player.volume = 0.5;
    player.pause();
  });

  const { status } = useEvent(player, 'statusChange', {
    status: player.status,
  });

  useFocusEffect(
    useCallback(() => {
      if (visible) {
        player.replay();
        player.play();
      }

      return () => {
        if (status === 'readyToPlay') {
          player.pause();
        }
      };
    }, [])
  );

  useEffect(() => {
    if (visible) {
      if (status === 'readyToPlay') {
        player.replay();
        player.play();
      }
    } else if (status === 'readyToPlay') {
      player.pause();
    }
  }, [visible]);

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
                <View
                  style={{
                    shadowColor: 'black',
                    shadowRadius: 1,
                    shadowOffset: { width: 0.5, height: 0.5 },
                  }}
                >
                  <ProfileIcon variant="user" />
                </View>
                <BoldSubheaderText
                  color={'white'}
                  style={{
                    color: 'white',
                    textShadowColor: 'black',
                    textShadowOffset: { width: 0.5, height: 0.5 },
                    textShadowRadius: 2,
                  }}
                >
                  {video.poster.username}
                </BoldSubheaderText>
              </PressableOpacity>
              {video.description && (
                <ExpandableDescription
                  description={video.description}
                  textColor="white"
                  shadow
                />
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
              }}
            />
            <FeedVideoButton
              name="comment"
              count={video.commentCount}
              onPress={() => {
                commentModalRef.current?.present();
              }}
            />
            <FeedVideoButton
              name="share"
              onPress={() =>
                addToCommunityCollectionModalRef.current?.present()
              }
            />
          </View>
        </View>
      </VideoView>
      <ReviewModal
        seller={video.poster}
        product={video.products[0]}
        bottomSheetRef={reviewModalRef}
      />
      <CommentModal videoId={video.id} bottomSheetRef={commentModalRef} />
      <AddToCommunityCollectionModal
        products={video.products}
        bottomSheetRef={addToCommunityCollectionModalRef}
      />
    </>
  );
};

export default FeedVideo;

const styles = StyleSheet.create({
  videoContainer: {
    width: Dimensions.get('window').width,
    height: MARKETPLACE_FEED_VIDEO_HEIGHT,
    backgroundColor: Color.GREY_500,
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
