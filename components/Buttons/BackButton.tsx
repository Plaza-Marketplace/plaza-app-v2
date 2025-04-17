import { StyleSheet } from 'react-native';
import { ChevronLeft } from '../Icons';
import Color from '@/constants/Color';
import PressableOpacity from './PressableOpacity';
import { router } from 'expo-router';
import Radius from '@/constants/Radius';
import { FC } from 'react';

interface BackButtonProps {
  alternativeColor?: boolean;
}

const BackButton: FC<BackButtonProps> = ({ alternativeColor = false }) => {
  return (
    <PressableOpacity
      style={[
        styles.container,
        {
          backgroundColor: alternativeColor
            ? Color.PRIMARY_DEFAULT
            : Color.NEUTRALS_100,
        },
      ]}
      onPress={router.back}
    >
      <ChevronLeft color={alternativeColor ? Color.NEUTRALS_WHITE : '#000'} />
    </PressableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: Color.NEUTRALS_100,
    padding: 10,
    borderRadius: Radius.LG,
  },
});
