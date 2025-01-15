import { FC, PropsWithChildren } from 'react';
import PlazaText, { PlazaTextProps } from './PlazaText';

const BoldCaptionText: FC<PropsWithChildren<PlazaTextProps>> = ({
  children,
  style,
}) => {
  return (
    <PlazaText fontSize={12} fontWeight="bold" style={style}>
      {children}
    </PlazaText>
  );
};

export default BoldCaptionText;
