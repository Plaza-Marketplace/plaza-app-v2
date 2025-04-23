import Color from '@/constants/Color';
import { MARKETPLACE_FEED_VIDEO_HEIGHT } from '@/constants/marketplace';
import { useVideoPlayer, VideoView } from 'expo-video';
import { FC, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
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

interface FeedVideoProps {
  video: Video;
  visible: boolean;
}

const FeedVideo: FC<FeedVideoProps> = ({ video, visible }) => {
  const reviewModalRef = useRef<BottomSheetModal>(null);
  const commentModalRef = useRef<BottomSheetModal>(null);
  const reportVideoRef = useRef<BottomSheetModal>(null);

  const { session } = useAuth();
  const isAnonymous = session?.user.is_anonymous;

  const player = useVideoPlayer(video.videoUrl, (player) => {
    player.loop = true;
    player.pause();
  });

  const { status } = useEvent(player, 'statusChange', {
    status: player.status,
  });

  useEffect(() => {
    if (visible) {
      if (status === 'readyToPlay') {
        player.replay();
        player.play();
      }
    } else if (status === 'readyToPlay') {
      player.pause();
    }
  }, [visible, status]);

  return (
    <>
      <VideoView
        style={styles.videoContainer}
        player={player}
        nativeControls={false}
        contentFit="cover"
      >
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
                  {video.poster.username}
                </BoldSubheaderText>
              </PressableOpacity>
              {video.description && (
                <ExpandableDescription
                  description={video.description}
                  textColor={Color.GREY_100}
                  shadow
                />
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
      </VideoView>
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
