import { StyleSheet, View } from 'react-native';
import StandardText from './Texts/StandardText';
import { FC } from 'react';
import Color from '@/constants/Color';
import PressableOpacity from './Buttons/PressableOpacity';
import Ionicons from '@expo/vector-icons/Ionicons';
import Spacing from '@/constants/Spacing';
import AddContentModal from './AddContentModal';

interface InfoSectionProps {
  title: string;
  description?: string;
}

const InfoSection: FC<InfoSectionProps> = ({ title, description }) => {
  return (
    <>
      <PressableOpacity style={styles.container}>
        <StandardText>{title}</StandardText>
        {!description ? (
          <View style={styles.selectContainer}>
            <StandardText>Select</StandardText>
            <Ionicons name="chevron-forward" size={24} color={Color.GREY_500} />
          </View>
        ) : (
          <StandardText>{description}</StandardText>
        )}
      </PressableOpacity>
      <AddContentModal title={title} />
    </>
  );
};

export default InfoSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Color.BORDER_SECONDARY,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.SPACING_2,
  },
});
