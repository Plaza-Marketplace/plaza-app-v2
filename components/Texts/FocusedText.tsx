import { FC, PropsWithChildren } from 'react';
import PlazaText, { PlazaTextProps } from './PlazaText';

const FocusedText: FC<PropsWithChildren<PlazaTextProps>> = ({
  children,
  style,
}) => {
  return (
    <PlazaText fontSize={16} fontWeight={500} style={style}>
      {children}
    </PlazaText>
  );
};

export default FocusedText;
