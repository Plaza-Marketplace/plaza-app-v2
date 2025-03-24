import { FC, ReactNode } from 'react';
import PressableOpacity from '../Buttons/PressableOpacity';
import BodyText from '../Texts/BodyText';
import { StyleSheet } from 'react-native';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';

interface TagProps {
  icon: ReactNode;
  name: string;
}

const Tag: FC<TagProps> = ({ icon, name }) => {
  return (
    <PressableOpacity style={styles.container}>
      {icon}
      <BodyText variant="sm" color={Color.NEUTRALS_DEFAULT}>
        {name}
      </BodyText>
    </PressableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: Color.NEUTRALS_150,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
    borderRadius: Radius.ROUNDED,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
