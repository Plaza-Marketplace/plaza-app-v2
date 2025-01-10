import { StyleSheet, View } from 'react-native';
import StandardText from './Texts/StandardText';
import { FC } from 'react';
import Color from '@/constants/Color';
import PressableOpacity from './Buttons/PressableOpacity';

interface InfoSectionProps {
  title: string;
  description?: string;
}

const InfoSection: FC<InfoSectionProps> = ({ title, description }) => {
  return (
    <PressableOpacity style={styles.container}>
      <StandardText>{title}</StandardText>
      {!description ? (
        <StandardText>Select</StandardText>
      ) : (
        <StandardText>{description}</StandardText>
      )}
    </PressableOpacity>
  );
};

export default InfoSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Color.BORDER_SECONDARY,
  },
});
