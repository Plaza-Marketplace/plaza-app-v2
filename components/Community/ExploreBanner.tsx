import { FC } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import BodyText from '../Texts/BodyText';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { router } from 'expo-router';
import Banner from '../Banner';

interface ExploreBannerProps {
  id: Id;
  backgroundUrl: string | null;
  name: string;
  description: string;
}

const ExploreBanner: FC<ExploreBannerProps> = ({
  id,
  backgroundUrl,
  name,
  description,
}) => {
  const handlePress = () => {
    router.push({ pathname: '/community/community_posts', params: { id } });
  };

  return (
    <Banner backgroundUrl={backgroundUrl} onPress={handlePress}>
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
  container: {
    width: Dimensions.get('window').width - 32,
    height: 200,
    borderRadius: Radius.LG,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    padding: 16,
  },
});
