import Color from '@/constants/Color';
import { MARKETPLACE_FEED_VIDEO_HEIGHT } from '@/constants/marketplace';
import { useVideoPlayer, VideoView } from 'expo-video';
import { FC, useRef, useState } from 'react';
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
import ProductIcon from '../Product/ProductIcon';
import Products from './Products';
import CommentModal from './CommentModal';

interface FeedVideoProps {
  videoUrl: string;
}

const FeedVideo: FC<FeedVideoProps> = ({ videoUrl }) => {
  const [expanded, setExpanded] = useState(false);
  const reviewModalRef = useRef<BottomSheetModal>(null);
  const commentModalRef = useRef<BottomSheetModal>(null);

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.play();
    player.volume = 0;
  });

  return (
    <>
      <VideoView
        style={styles.videoContainer}
        player={player}
        nativeControls={false}
      >
        <View
          style={[
            styles.infoButtonsContainer,
            {
              backgroundColor: expanded ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
            },
          ]}
        >
          <View style={styles.videoInfoContainer}>
            <Products />
            <View style={styles.infoTextContainer}>
              <PressableOpacity
                onPress={() => router.push('/(app)/list-item')}
                style={styles.userInfoContainer}
              >
                <ProfileIcon variant="user" />
                <BoldSubheaderText>Display Name</BoldSubheaderText>
              </PressableOpacity>
              <ExpandableDescription
                description="User-generated description of the video that gets truncated to
                one line."
              />
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <FeedVideoButton name="like" count={4} onPress={() => {}} />
            <FeedVideoButton
              name="review"
              count={4}
              onPress={() => {
                reviewModalRef.current?.present();
                reviewModalRef.current?.expand();
              }}
            />
            <FeedVideoButton
              name="comment"
              count={4}
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
