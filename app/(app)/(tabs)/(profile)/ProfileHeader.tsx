import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Radius from '@/constants/Radius';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import BoldCaptionText from '@/components/Texts/BoldCaptionText';
import CaptionText from '@/components/Texts/CaptionText';
import { returnRatings } from '@/components/PlazaIcons/RatingIcons';
import ExpandableDescription from '@/components/ExpandableDescription';
import { User } from '@/models/user';
import {
  useGetFollowerCount,
  useGetFollowingCount,
} from '@/hooks/queries/useFollow';
import ProfileIcon from '@/components/ProfileIcon';
import { useGetSalesCountBySellerId } from '@/hooks/queries/useGetProductsBySellerId';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ user }) => {
  const { data: followers, isLoading: isFollowersLoading } =
    useGetFollowerCount(user.id);
  const { data: following, isLoading: isFollowingLoading } =
    useGetFollowingCount(user.id);
  const { data: sales, isLoading: isSalesLoading } = useGetSalesCountBySellerId(
    user.id
  );

  if (isFollowersLoading || isFollowingLoading || isSalesLoading) {
    return <Text>Loading...</Text>;
  }

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
            <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
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
    padding: 16,
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
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerText: {
    alignItems: 'center',
  },
  commonMargin: {
    marginTop: 5,
    marginBottom: 5,
  },
});
