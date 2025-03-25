import Color from '@/constants/Color';
import { Plus } from '../Icons';
import PressableOpacity from './PressableOpacity';
import { StyleSheet } from 'react-native';
import Radius from '@/constants/Radius';
import { FC } from 'react';

interface AddProps {
  onPress: () => void;
}

const Add: FC<AddProps> = ({ onPress }) => {
  return (
    <PressableOpacity style={styles.container} onPress={onPress}>
      <Plus color={Color.NEUTRALS_200} />
    </PressableOpacity>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    width: 84,
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Radius.ROUNDED,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Color.NEUTRALS_200,
  },
});
