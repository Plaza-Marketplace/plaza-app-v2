import { FC, PropsWithChildren } from 'react';
import PlazaText from './PlazaText';

const MediumText: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PlazaText fontSize={14} fontWeight="medium">
      {children}
    </PlazaText>
  );
};

export default MediumText;
