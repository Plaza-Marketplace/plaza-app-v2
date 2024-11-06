import { FC, PropsWithChildren } from 'react';
import PlazaText from './PlazaText';

const CaptionText: FC<PropsWithChildren> = ({ children }) => {
  return <PlazaText fontSize={12}>{children}</PlazaText>;
};

export default CaptionText;
