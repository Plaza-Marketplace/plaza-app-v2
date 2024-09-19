import { FC, PropsWithChildren } from 'react';
import PlazaText from './PlazaText';

const HeaderText: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PlazaText fontSize={18} fontWeight={700}>
      {children}
    </PlazaText>
  );
};

export default HeaderText;
