import Color from '@/constants/Color';
import { Knitting } from '../Icons';
import Tag from './Tag';

const NeedleworkTag = () => {
  return (
    <Tag icon={<Knitting color={Color.NEUTRALS_DEFAULT} />} name="Needlework" />
  );
};

export default NeedleworkTag;
