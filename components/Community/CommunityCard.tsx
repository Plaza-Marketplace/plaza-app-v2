import { StyleSheet, View } from 'react-native';
import CommunityIcon from '../ProfileIcons/CommunityIcon';
import SubheaderText from '../Texts/SubheaderText';
import { FC } from 'react';
import Community from '@/models/community';
import PlazaText from '../Texts/PlazaText';
import NotificationNumber from '../NotificationNumber';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';

const COMMUNITY_ICON_SIZE = 64;

interface CommunityCardProps {
  community: Community;
  notificationsCount: number;
}

const CommunityCard: FC<CommunityCardProps> = ({
  community,
  notificationsCount,
}) => {
  return (
    <PressableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: 'community',
          params: { id: community.id },
        })
      }
    >
      <CommunityIcon size={COMMUNITY_ICON_SIZE} url={community.iconUrl} />
      <View style={styles.communityInfo}>
        <SubheaderText>{community.name}</SubheaderText>
        <PlazaText>{community.memberCount} members</PlazaText>
      </View>
      <NotificationNumber notificationsCount={notificationsCount} />
    </PressableOpacity>
  );
};

export default CommunityCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingLeft: 16,
    paddingRight: 32,
  },
  communityInfo: {
    flex: 1,
    gap: 4,
  },
});
