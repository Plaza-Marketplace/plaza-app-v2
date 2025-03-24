import Color from '@/constants/Color';
import { Pottery } from '../Icons';
import Tag from './Tag';

const CeramicsTag = () => {
  return (
    <Tag icon={<Pottery color={Color.NEUTRALS_DEFAULT} />} name="Ceramics" />
  );
};

export default CeramicsTag;
