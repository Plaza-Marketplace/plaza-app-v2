import { FC, PropsWithChildren } from 'react';
import PlazaText, { PlazaTextProps } from './PlazaText';

const HeaderText: FC<PropsWithChildren<PlazaTextProps>> = ({
  children,
  style,
}) => {
  return (
    <PlazaText fontSize={18} fontWeight={700} style={style}>
      {children}
    </PlazaText>
  );
};

export default HeaderText;
