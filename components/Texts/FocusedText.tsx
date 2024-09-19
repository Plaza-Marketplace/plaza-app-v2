import { FC, PropsWithChildren } from 'react';
import PlazaText from './PlazaText';

const FocusedText: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PlazaText fontSize={16} fontWeight={500}>
      {children}
    </PlazaText>
  );
};

export default FocusedText;
