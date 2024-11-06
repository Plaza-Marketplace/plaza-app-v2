import { FC, PropsWithChildren } from 'react';
import PlazaText from './PlazaText';

const BoldCaptionText: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PlazaText fontSize={12} fontWeight="bold">
      {children}
    </PlazaText>
  );
};

export default BoldCaptionText;
