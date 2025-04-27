import Color from '@/constants/Color';
import { Jewelry } from '../Icons';
import Tag from './Tag';

const JewelryTag = () => {
  return (
    <Tag icon={<Jewelry color={Color.NEUTRALS_DEFAULT} />} name="Jewelry" />
  );
};

export default JewelryTag;
