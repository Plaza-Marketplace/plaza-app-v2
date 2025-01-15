import { FC, PropsWithChildren } from 'react';
import PlazaText, { PlazaTextProps } from './PlazaText';

const TitleText: FC<PropsWithChildren<PlazaTextProps>> = ({
  children,
  style,
}) => {
  return (
    <PlazaText fontSize={24} fontWeight="bold" style={style}>
      {children}
    </PlazaText>
  );
};

export default TitleText;
