import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import BodyText from './Texts/BodyText';

interface ChipProps {
  title: string;
  isSelected?: boolean;
}

const Chip: FC<ChipProps> = ({ title, isSelected = false }) => {
  return (
    <View
      style={[
        styles.container,
        isSelected && { borderWidth: 1, borderColor: Color.PRIMARY_DEFAULT },
      ]}
    >
      <BodyText variant="sm-medium" color={Color.PRIMARY_DEFAULT}>
        {title}
      </BodyText>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderRadius: Radius.SM,
    backgroundColor: Color.PRIMARY_100,
    padding: 4,
  },
});
