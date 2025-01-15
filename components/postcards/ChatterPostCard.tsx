import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ProfileIconCircle } from './PostIcon';
import CaptionText from '../Texts/CaptionText';
import FocusedText from '../Texts/FocusedText';
import PlazaText from '../Texts/PlazaText';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';
import { returnRatings } from '../PlazaIcons/RatingIcons';
import { ChatterCommunityPost, CommunityPost } from '@/models/communityPost';
import { formatDatetime } from '@/utils/datetime';
import ProfileIcon from '../ProfileIcon';

interface PostCardProps {
  communityPost: ChatterCommunityPost;
}

const PostCard = ({ communityPost }: PostCardProps) => {
  return (
    <PressableOpacity
      style={styles.container}
      onPress={() =>
        router.navigate({
          pathname: '/post-modal',
          params: { postId: communityPost.id, postName: communityPost.title },
        })
      }
    >
      <View style={styles.userInfoContainer}>
        <ProfileIcon variant="community" />
        <View style={{ marginLeft: 5 }}>
          <CaptionText>{communityPost.poster.username}</CaptionText>
          <CaptionText style={{ marginTop: 3 }}>
            {formatDatetime(communityPost.createdAt)}
          </CaptionText>
        </View>
      </View>

      <View style={styles.sectionMargin}>
        <FocusedText>{communityPost.title}</FocusedText>
      </View>

      <View style={(styles.sectionMargin, styles.ratingContainer)}>
        {returnRatings(0, 'small')}
      </View>

      <View style={styles.sectionMargin}>
        <PlazaText>{communityPost.description}</PlazaText>
      </View>

      <View style={styles.sectionMargin}></View>
    </PressableOpacity>
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
