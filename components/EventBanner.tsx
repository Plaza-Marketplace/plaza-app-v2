import { StyleSheet, View } from 'react-native';
import Banner from './Banner';
import { FC } from 'react';
import BodyText from './Texts/BodyText';
import Circle from './Circle';
import Color from '@/constants/Color';

interface EventBannerProps {
  id: Id;
  backgroundUrl: string | null;
  name: string;
  description: string;
}

const EventBanner: FC<EventBannerProps> = ({
  id,
  backgroundUrl,
  name,
  description,
}) => {
  const handlePress = () => {};

  return (
    <Banner backgroundUrl={backgroundUrl} onPress={handlePress}>
      <View style={styles.content}>
        <View style={styles.liveContainer}>
          <Circle size={8} style={{ backgroundColor: Color.LIVES_500 }} />
          <BodyText variant="sm" color={Color.NEUTRALS_WHITE}>
            Live
          </BodyText>
        </View>
        <BodyText variant="lg-bold" color={Color.NEUTRALS_WHITE}>
          {name}
        </BodyText>
      </View>
    </Banner>
  );
};

export default EventBanner;

const styles = StyleSheet.create({
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
