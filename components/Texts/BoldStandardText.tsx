import { FC, PropsWithChildren } from 'react';
import PlazaText, { PlazaTextProps } from './PlazaText';

const BoldStandardText: FC<PropsWithChildren<PlazaTextProps>> = ({
  children,
  style,
}) => {
  return (
    <PlazaText fontSize={14} fontWeight="bold" style={style}>
      {children}
    </PlazaText>
  );
};

export default BoldStandardText;
