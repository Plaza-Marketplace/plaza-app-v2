import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { View } from 'react-native';
import Color from '@/constants/Color';

interface RatingIconsProps {
  size: 'small' | 'large';
}

const FullStarIcon = ({ size }: RatingIconsProps) => {
  return (
    <MaterialCommunityIcons
      name={'star'}
      size={size === 'small' ? 20 : 40}
      color={Color.REVIEWS_500}
    />
  );
};

const HalfStarIcon = ({ size }: RatingIconsProps) => {
  return (
    <MaterialCommunityIcons
      name={'star-half-full'}
      size={size === 'small' ? 20 : 40}
      color={Color.REVIEWS_500}
    />
  );
};

const EmptyStarIcon = ({ size }: RatingIconsProps) => {
  return (
    <MaterialCommunityIcons
      name={'star-outline'}
      size={size === 'small' ? 20 : 40}
      color={Color.REVIEWS_500}
    />
  );
};

const returnRatings = (
  rating: number,
  size: 'small' | 'large',
  key = Date.now()
) => {
  const results = [...Array(5)].map((_, index) => {
    for (let i = 0; i < 5; i++) {
      let element = null;
      if (rating - 1 >= 0) {
        rating -= 1;
        element = <FullStarIcon size={size} key={`${key}-full-${index}`} />;
      } else if (rating - 0.5 >= 0) {
        rating -= 0.5;
        element = <HalfStarIcon size={size} key={`${key}-half-${index}`} />;
      } else {
        element = <EmptyStarIcon size={size} key={`${key}-empty-${index}`} />;
      }
      return element;
    }
  });
  return <View style={{ flexDirection: 'row' }}>{results}</View>;
};

export { FullStarIcon, HalfStarIcon, returnRatings };
