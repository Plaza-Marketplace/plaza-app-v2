import Color from '@/constants/Color';
import { Glass } from '../Icons';
import Tag from './Tag';

const GlassTag = () => {
  return <Tag icon={<Glass color={Color.NEUTRALS_DEFAULT} />} name="Glass" />;
};

export default GlassTag;
