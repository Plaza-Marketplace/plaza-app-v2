import Radius from '@/constants/Radius';
import { Dimensions, StyleSheet, View } from 'react-native';
import BodyText from '../Texts/BodyText';
import { FC } from 'react';
import Color from '@/constants/Color';
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

const JoinCard: FC<JoinCardProps> = ({ id, name, description, iconUrl }) => {
  return (
    <PressableOpacity
      style={styles.container}
      onPress={() => pushCommunityScreen(id)}
    >
      <GroupIcon id={id} url={iconUrl} size={52} />
      <View>
        <BodyText variant="lg-semibold" numberOfLines={1}>
          {name}
        </BodyText>
        <BodyText variant="md" numberOfLines={4}>
          {description}
        </BodyText>
      </View>
    </PressableOpacity>
  );
};

export default JoinCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    minHeight: 200,
    borderRadius: Radius.LG,
    backgroundColor: Color.NEUTRALS_WHITE,
  },
});
