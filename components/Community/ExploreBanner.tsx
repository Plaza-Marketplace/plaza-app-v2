import { FC } from 'react';
import BodyText from '../Texts/BodyText';
import Color from '@/constants/Color';
import { router } from 'expo-router';
import Banner from '../Banner';
import { StyleSheet } from 'react-native';

interface ExploreBannerProps {
  id: Id;
  bannerUrl: string | null;
  name: string;
  description: string;
}

const ExploreBanner: FC<ExploreBannerProps> = ({
  id,
  bannerUrl,
  name,
  description,
}) => {
  const handlePress = () => {
    router.push({ pathname: '/community', params: { id } });
  };

  return (
    <Banner backgroundUrl={bannerUrl} onPress={handlePress}>
      <BodyText variant="lg-semibold" color={Color.WHITE}>
        {name}
      </BodyText>
      <BodyText variant="lg" color={Color.WHITE} numberOfLines={2}>
        {description}
      </BodyText>
    </Banner>
  );
};

export default ExploreBanner;

const styles = StyleSheet.create({
  textShadowStyle: {
    textShadowColor: Color.BLACK,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
