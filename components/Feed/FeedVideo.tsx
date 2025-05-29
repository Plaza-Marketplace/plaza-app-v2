import Color from '@/constants/Color';
import { MARKETPLACE_FEED_VIDEO_HEIGHT } from '@/constants/marketplace';
import { useVideoPlayer, VideoView } from 'expo-video';
import { FC, useRef, useContext, useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Pressable } from 'react-native';
import BoldSubheaderText from '../Texts/BoldSubheaderText';
import ProfileIcon from '../ProfileIcon';
import Spacing from '@/constants/Spacing';
import FeedVideoButton from '../FeedVideoButton';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';
import ReviewModal from './ReviewModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ExpandableDescription from '../ExpandableDescription';
import Products from './Products';
import CommentModal from './CommentModal';
import LikeButton from './LikeButton';
import { useEvent } from 'expo';
import { Event, track } from '@/analytics/utils';
import VideoReportModal from '../Report/ReportModal/VideoReportModal';
import { useAuth } from '@/contexts/AuthContext';
import {
  ItemKeyContext,
  ViewabilityItemsContext,
} from '@/components/List/ViewabilityTrackerFlashList';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import useCreateVideoLike from '@/hooks/queries/useCreateVideoLike';
import { HeartActive } from '../Icons';

interface FeedVideoProps {
  video: Video;
}

const FeedVideo: FC<FeedVideoProps> = ({ video }) => {
  const id = useContext(ItemKeyContext)!;
  const context = useContext(ViewabilityItemsContext);
  console.log(`id: ${id}, context: ${context.value}`);
  const reviewModalRef = useRef<BottomSheetModal>(null);
  const commentModalRef = useRef<BottomSheetModal>(null);
  const reportVideoRef = useRef<BottomSheetModal>(null);
  const [visible, setVisible] = useState(false);

  const { session } = useAuth();
  const { mutate: likeVideo } = useCreateVideoLike(video.id);

  const isAnonymous = session?.user.is_anonymous;

  const player = useVideoPlayer(video.videoUrl, (player) => {
    player.loop = true;
    player.pause();
  });

  const { error, status } = useEvent(player, 'statusChange', {
    status: player.status,
  });

  const lastTap = useRef<number | null>(null);

  useEffect(() => {
    if (visible) {
      if (status === 'readyToPlay') {
        player.play();
      }
    } else if (status === 'readyToPlay') {
      player.pause();
    }
  }, [visible, status]);

  const visibleAction = () => {
    requestAnimationFrame(() => {
      setVisible(true);
    });
  };

  const invisibleAction = () => {
    requestAnimationFrame(() => {
      setVisible(false);
    });
  };

  useAnimatedReaction(
    () => context.value,
    (ctx) => {
      if (ctx.includes(id)) {
        // do stuff on item visible
        runOnJS(visibleAction)();
      } else if (!ctx.includes(id)) {
        // do stuff on item invisible
        runOnJS(invisibleAction)();
      }
    }
  );

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      likeVideo();
    } else {
      lastTap.current = now;
    }
  };

  return (
    <>
      <View style={styles.videoContainer}>
        <Pressable onPress={handleDoubleTap}>
        <VideoView
            style={styles.videoContainer}
            player={player}
            nativeControls={false}
            contentFit="cover"
          />

          <View style={styles.infoButtonsContainer}>
            <View style={styles.videoInfoContainer}>
              <Products
                sellerId={video.poster.id}
                products={video.products}
                videoId={video.id}
              />
              <View style={styles.infoTextContainer}>
                <PressableOpacity
                  onPress={() => {
                    if (isAnonymous) {
                      router.push('/onboarding/login');
                      return;
                    }
                    router.push({
                      pathname: '/profile-modal',
                      params: { id: video.poster.id },
                    });
                  }}
                  style={styles.userInfoContainer}
                >
                  <View
                    style={{
                      shadowColor: 'black',
                      shadowRadius: 1,
                      shadowOffset: { width: 0.5, height: 0.5 },
                    }}
                  >
                    <ProfileIcon
                      variant="user"
                      url={video.poster.profileImageUrl ?? undefined}
                    />
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
                    {video.poster.displayName ?? video.poster.username}
                  </BoldSubheaderText>
                </PressableOpacity>
                {video.description && (
                <View style={{ width: '85%' }}>
                    <ExpandableDescription
                      description={video.description}
                      textColor={Color.GREY_100}
                      shadow
                    />
                </View>
                )}
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              {!isAnonymous && (
                <>
                  <LikeButton
                    videoId={video.id}
                    isLiked={video.isLiked}
                    likeCount={video.likeCount}
                  />
                  <FeedVideoButton
                    name="comment"
                    count={video.commentCount}
                    onPress={() => {
                      track(Event.CLICKED_COMMMENT_ICON, { videoId: video.id });
                      commentModalRef.current?.present();
                    }}
                  />
                  <FeedVideoButton
                    name="review"
                    count={video.reviewCount}
                    onPress={() => {
                      track(Event.CLICKED_REVIEW_ICON, { videoId: video.id });
                      reviewModalRef.current?.present();
                    }}
                  />
                  <FeedVideoButton
                    name="report"
                    onPress={() => {
                      reportVideoRef.current?.present();
                    }}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      </Pressable>
      <ReviewModal
        seller={video.poster}
        product={video.products[0]}
        bottomSheetRef={reviewModalRef}
      />
      <CommentModal videoId={video.id} bottomSheetRef={commentModalRef} />
      <VideoReportModal videoId={video.id} bottomSheetRef={reportVideoRef} />
    </>
  );
};

export default FeedVideo;

const styles = StyleSheet.create({
  videoContainer: {
    width: Dimensions.get('window').width,
    height: MARKETPLACE_FEED_VIDEO_HEIGHT,
    backgroundColor: Color.BLUE_300,
  },
  infoButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    padding: Spacing.SPACING_3,
    gap: Spacing.SPACING_2,
    justifyContent: 'space-between',
  },
  videoInfoContainer: {
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
