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
import { FC } from 'react';

interface OngoingEventProps {
  id: Id;
  name: string;
  city: string;
  state: string;
  iconUrl: Url | null;
}

const OngoingEvent: FC<OngoingEventProps> = ({
  id,
  name,
  city,
  state,
  iconUrl,
}) => {
  return (
    <PressableOpacity
      style={styles.container}
      onPress={() => router.push({ pathname: '/event', params: { id } })}
    >
      <View style={{ gap: 4 }}>
        <HeadingText variant="h6">{name}</HeadingText>
        <BodyText variant="md-medium">
          {city}, {state}
        </BodyText>
        <LiveIndicator />
      </View>
      <Image source={{ uri: iconUrl }} style={styles.image} />
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
  image: {
    width: 60,
    height: 60,
    backgroundColor: Color.GREY_100,
    borderRadius: Radius.ROUNDED,
  },
});
