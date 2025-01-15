import { FC, PropsWithChildren } from 'react';
import PlazaText, { PlazaTextProps } from './PlazaText';

const BoldSubheaderText: FC<PropsWithChildren<PlazaTextProps>> = ({
  children,
  style,
}) => {
  return (
    <PlazaText fontWeight="bold" fontSize={16} style={style}>
      {children}
    </PlazaText>
  );
};

export default BoldSubheaderText;
