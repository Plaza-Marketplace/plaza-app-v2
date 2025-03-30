import { StyleSheet, View } from 'react-native';
import Banner from './Banner';
import { FC } from 'react';
import BodyText from './Texts/BodyText';
import Circle from './Circle';
import Color from '@/constants/Color';
import { formatDatetime, formatRange } from '@/utils/datetime';
import { router } from 'expo-router';

interface EventBannerProps {
  id: Id;
  name: string;
  address: string;
  city: string;
  state: string;
  startDate: Timestamp;
  endDate: Timestamp;
  bannerUrl: Url | null;
}

const EventBanner: FC<EventBannerProps> = ({
  id,
  name,
  address,
  city,
  state,
  startDate,
  endDate,
  bannerUrl,
}) => {
  const handlePress = () => {
    router.push({
      pathname: '/event',
      params: { id },
    });
  };

  return (
    <Banner backgroundUrl={bannerUrl} onPress={handlePress}>
      <View style={styles.content}>
        <View style={styles.liveContainer}>
          <Circle size={8} style={{ backgroundColor: Color.LIVES_500 }} />
          <BodyText variant="sm" color={Color.NEUTRALS_WHITE}>
            Live
          </BodyText>
        </View>
        <View>
          <BodyText variant="lg-bold" color={Color.NEUTRALS_WHITE}>
            {name}
          </BodyText>
          <BodyText variant="lg-medium" color={Color.NEUTRALS_WHITE}>
            {city}, {state}
          </BodyText>
          <BodyText variant="lg-medium" color={Color.NEUTRALS_WHITE}>
            {formatRange(startDate, endDate)}
          </BodyText>
          <BodyText variant="md" color={Color.NEUTRALS_WHITE}>
            {address}
          </BodyText>
        </View>
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
