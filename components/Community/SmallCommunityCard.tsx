import { FC } from 'react';
import PressableOpacity from '../Buttons/PressableOpacity';
import { StyleSheet, View } from 'react-native';
import Color from '@/constants/Color';
import HeadingText from '../Texts/HeadingText';
import MemberCount from './MemberCount';
import Radius from '@/constants/Radius';
import { router } from 'expo-router';
import GroupIcon from './GroupIcon';

interface SmallCommunityCardProps {
  id: Id;
  iconUrl: string | null;
  name: string;
  memberCount: number;
}

const SmallCommunityCard: FC<SmallCommunityCardProps> = ({
  id,
  iconUrl,
  memberCount,
  name,
}) => {
  const handlePress = () => {
    router.push({
      pathname: '/community/community_posts',
      params: { id },
    });
  };

  return (
    <PressableOpacity style={styles.container} onPress={handlePress}>
      <GroupIcon size={52} url={iconUrl} />
      <View style={styles.infoContainer}>
        <HeadingText variant="h6-bold">{name}</HeadingText>
        <MemberCount count={memberCount} />
      </View>
    </PressableOpacity>
  );
};

export default SmallCommunityCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    borderRadius: Radius.ROUNDED,
    borderWidth: 1,
    backgroundColor: Color.NEUTRALS_WHITE,
    borderColor: Color.NEUTRALS_200,
    padding: 16,
  },
  infoContainer: {
    gap: 4,
  },
});
