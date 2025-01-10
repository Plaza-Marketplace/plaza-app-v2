import { FC, PropsWithChildren } from 'react';
import PlazaText from './PlazaText';

const TitleText: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PlazaText fontSize={24} fontWeight="bold">
      {children}
    </PlazaText>
  );
};

export default TitleText;
