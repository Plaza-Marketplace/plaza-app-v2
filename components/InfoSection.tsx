import { StyleSheet, View } from 'react-native';
import StandardText from './Texts/StandardText';
import { FC, useRef } from 'react';
import Color from '@/constants/Color';
import PressableOpacity from './Buttons/PressableOpacity';
import Ionicons from '@expo/vector-icons/Ionicons';
import Spacing from '@/constants/Spacing';
import PlazaTextInput from './PlazaTextInput';
import InfoSectionModal from './InfoSectionModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface InfoSectionProps {
  title: string;
  description?: string;
}

const InfoSection: FC<InfoSectionProps> = ({ title, description }) => {
  const infoSectionRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <PressableOpacity
        style={styles.container}
        onPress={() => {
          infoSectionRef.current?.present();
          infoSectionRef.current?.snapToIndex(1);
        }}
      >
        <StandardText>{title}</StandardText>
        {!description ? (
          <View style={styles.selectContainer}>
            <StandardText>Select</StandardText>
            <Ionicons name="chevron-forward" size={24} color={Color.GREY_500} />
          </View>
        ) : (
          <PlazaTextInput keyboardType="number-pad" />
          // <StandardText>{description}</StandardText>
        )}
      </PressableOpacity>
      <InfoSectionModal
        title={title}
        items={['Brand New', 'Like New']}
        bottomSheetRef={infoSectionRef}
      />
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
