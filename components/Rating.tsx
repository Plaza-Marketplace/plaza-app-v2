import { FC } from 'react';
import BoldCaptionText from './Texts/BoldCaptionText';

interface RatingProps {
  rating: number;
}

const Rating: FC<RatingProps> = ({ rating }) => {
  return <BoldCaptionText>{rating}</BoldCaptionText>;
};

export default Rating;
