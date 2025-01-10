import { FC, PropsWithChildren } from 'react';
import PlazaText from './PlazaText';

const BoldStandardText: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PlazaText fontSize={14} fontWeight="bold">
      {children}
    </PlazaText>
  );
};

export default BoldStandardText;
