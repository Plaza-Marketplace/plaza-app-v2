import { FC, PropsWithChildren } from 'react';
import PlazaText from './PlazaText';

const BoldSubheaderText: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PlazaText fontWeight="bold" fontSize={16}>
      {children}
    </PlazaText>
  );
};

export default BoldSubheaderText;
