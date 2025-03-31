import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import Radius from '@/constants/Radius';
import ExpandableDescription from '@/components/ExpandableDescription';
import ProfileIcon from '@/components/ProfileIcon';
import PlazaButton from '@/components/Buttons/PlazaButton';
import { useFollowUser, useUnfollowUser } from './hooks';
import { useAuth } from '@/contexts/AuthContext';
import HeadingText from '@/components/Texts/HeadingText';
import Rating from '@/components/Rating';
import BodyText from '@/components/Texts/BodyText';
import { Header as HeaderType } from './models';

interface HeaderProps {
  userId: Id;
  header: HeaderType;
}

const Header: FC<HeaderProps> = ({ userId, header }) => {
  const { user: currentUser } = useAuth();
  const { mutate: followUser } = useFollowUser();
  const { mutate: unfollowUser } = useUnfollowUser();

  return (
    <View style={styles.header}>
      <View style={styles.headerTopRow}>
        <ProfileIcon
          variant="user"
          url={header.profileImageUrl || undefined}
          size={2 * Radius.XL}
        />
        <View style={styles.userInfo}>
          <HeadingText variant="h5-bold">{header.username}</HeadingText>
          <Rating rating={header.averageRating ?? 0} />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View>
          <BodyText variant="lg-bold">{header.salesCount}</BodyText>
          <BodyText variant="lg-medium">Sales</BodyText>
        </View>

        <View>
          <BodyText variant="lg-bold">{header.followerCount}</BodyText>
          <BodyText variant="lg-medium">Followers</BodyText>
        </View>

        <View>
          <BodyText variant="lg-bold">{header.followingCount}</BodyText>
          <BodyText variant="lg-medium">Following</BodyText>
        </View>
      </View>
      {userId !== currentUser?.id && (
        <View style={styles.choices}>
          <PlazaButton
            style={{ flex: 1 }}
            title={header.isFollowing ? 'Unfollow' : 'Follow'}
            onPress={() => {
              if (header.isFollowing) {
                unfollowUser(userId);
              } else {
                followUser(userId);
              }
            }}
          />
          <PlazaButton style={{ flex: 1 }} title="Message" />
        </View>
      )}
      <ExpandableDescription
        description={header.description ?? ''}
        initialNumberOfLines={4}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    padding: 16,
    gap: 16,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  choices: {
    flexDirection: 'row',
    gap: 22,
  },
  userInfo: {
    gap: 4,
  },
});
