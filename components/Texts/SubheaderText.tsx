import { FC, PropsWithChildren } from 'react';
import PlazaText from './PlazaText';

const SubheaderText: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PlazaText fontSize={16} fontWeight="medium">
      {children}
    </PlazaText>
  );
};

export default SubheaderText;
