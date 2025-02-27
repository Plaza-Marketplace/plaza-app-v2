import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Radius from '@/constants/Radius';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import BoldCaptionText from '@/components/Texts/BoldCaptionText';
import CaptionText from '@/components/Texts/CaptionText';
import { returnRatings } from '@/components/PlazaIcons/RatingIcons';
import ExpandableDescription from '@/components/ExpandableDescription';
import { User } from '@/models/user';
import { useDeleteFollow } from '@/hooks/queries/useFollow';
import ProfileIcon from '@/components/ProfileIcon';
import {
  useCreateFollowRequest,
  useDeleteFollowRequestByRelation,
} from '@/hooks/queries/useFollowRequest';
import PlazaButton from '@/components/Buttons/PlazaButton';
import { CreateFollowRequest } from '@/models/followRequest';
import Spacing from '@/constants/Spacing';

interface ProfileHeaderProps {
  user: User;
  currentUser: Id;
  followers: number;
  following: number;
  sales: number;
  isFollowing: boolean;
  isRequested: boolean;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  user,
  currentUser,
  followers,
  following,
  sales,
  isFollowing,
  isRequested,
}) => {
  const { mutate: createRequest } = useCreateFollowRequest();
  const { mutate: cancelRequest } = useDeleteFollowRequestByRelation();
  const { mutate: deleteFollow } = useDeleteFollow();

  return (
    <View style={styles.header}>
      <View style={styles.headerTopGrid}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerTopColumnSmall}>
            <ProfileIcon
              variant="user"
              url={user.profileImageUrl || undefined}
              size={2 * Radius.XL}
            />
          </View>

          <View style={styles.headerTopColumnLarge}>
            <View style={styles.infoContainer}>
              <View style={styles.centerText}>
                <BoldStandardText>{sales}</BoldStandardText>
                <BoldStandardText>Sales</BoldStandardText>
              </View>

              <View style={styles.centerText}>
                <BoldStandardText>{followers}</BoldStandardText>
                <BoldStandardText>Followers</BoldStandardText>
              </View>

              <View style={styles.centerText}>
                <BoldStandardText>{following}</BoldStandardText>
                <BoldStandardText>Following</BoldStandardText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.headerTopRow}>
          <View style={styles.headerTopColumnSmall}>
            <View style={styles.commonMargin}>
              <BoldCaptionText>{`@${user.username}`}</BoldCaptionText>
            </View>
            <CaptionText>City, State</CaptionText>
          </View>
          <View style={styles.headerTopColumnLarge}>
            <View
              style={{
                paddingHorizontal: Spacing.SPACING_1,
                flexDirection: 'row',
              }}
            >
              {returnRatings(4.5, 'small')}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.commonMargin}>
        <ExpandableDescription
          description={user.description ? user.description : ''}
          initialNumberOfLines={4}
        />
      </View>

      {user.id !== currentUser && (
        <View style={styles.choices}>
          {isRequested ? (
            <PlazaButton
              title="Cancel Request"
              onPress={() => {
                const relation: CreateFollowRequest = {
                  senderId: currentUser,
                  recipientId: user.id,
                };
                cancelRequest(relation);
              }}
            />
          ) : (
            <PlazaButton
              title={isFollowing ? 'Unfollow' : 'Follow'}
              onPress={() => {
                if (isFollowing) {
                  const relation: CreateFollow = {
                    sourceId: currentUser,
                    destId: user.id,
                  };
                  deleteFollow(relation);
                } else {
                  const relation: CreateFollowRequest = {
                    senderId: currentUser,
                    recipientId: user.id,
                  };
                  createRequest(relation);
                }
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  test: {
    flex: 1,
    height: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'column',
    padding: Spacing.SPACING_3,
  },
  headerTopGrid: {
    flexDirection: 'column',
  },
  headerTopColumnSmall: {
    width: '30%',
    flexDirection: 'column',
  },
  headerTopColumnLarge: {
    flex: 1,
    flexDirection: 'column',
  },
  headerTopRow: {
    flexDirection: 'row',
  },
  testCircle: {
    width: 2 * Radius.XL,
    height: 2 * Radius.XL,
    borderRadius: Radius.XL,
    backgroundColor: 'gray',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: Spacing.SPACING_1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerText: {
    alignItems: 'center',
  },
  commonMargin: {
    marginTop: Spacing.SPACING_1,
    marginBottom: Spacing.SPACING_1,
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
