import Radius from '@/constants/Radius';
import { StyleSheet, View } from 'react-native';
import BodyText from '../Texts/BodyText';
import { FC } from 'react';
import PlazaButton from '../Buttons/PlazaButton';
import Color from '@/constants/Color';
import ProfileIcon from '../ProfileIcon';
import PressableOpacity from '../Buttons/PressableOpacity';
import { pushCommunityScreen } from '@/utils/community';
import GroupIcon from './GroupIcon';

interface JoinCardProps {
  id: Id;

  name: string;

  description: string;

  iconUrl: Url | null;

  isMember: boolean;
}

const JoinCard: FC<JoinCardProps> = ({
  id,
  name,
  description,
  iconUrl,
  isMember,
}) => {
  return (
    <PressableOpacity
      style={styles.container}
      onPress={() => pushCommunityScreen(id)}
    >
      <GroupIcon url={iconUrl} size={52} />
      <View>
        <BodyText variant="lg-semibold" numberOfLines={1}>
          {name}
        </BodyText>
        <BodyText variant="md" numberOfLines={2}>
          {description}
        </BodyText>
      </View>
      <PlazaButton title={isMember ? 'Joined' : 'Join'} />
    </PressableOpacity>
  );
};

export default JoinCard;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    padding: 16,
    gap: 12,
    borderRadius: Radius.LG,
    backgroundColor: Color.NEUTRALS_WHITE,
  },
});
