import { View } from 'react-native';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import Radius from '@/constants/Radius';
import HeadingText from '../Texts/HeadingText';
import BodyText from '../Texts/BodyText';
import LiveIndicator from '../LiveIndicator';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';

const OngoingEvent = () => {
  return (
    <PressableOpacity
      style={styles.container}
      onPress={() => router.push('/event')}
    >
      <View style={{ gap: 4 }}>
        <HeadingText variant="h6">Jackalope Festival</HeadingText>
        <BodyText variant="md-medium">Old Pasadena, CA</BodyText>
        <LiveIndicator />
      </View>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={{ width: 60, height: 60 }}
      />
    </PressableOpacity>
  );
};

export default OngoingEvent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Color.NEUTRALS_WHITE,
    padding: Spacing.SPACING_3,
    borderRadius: Radius.LG,
    borderWidth: 1,
    borderColor: Color.NEUTRALS_150,
  },
});
