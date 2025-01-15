import { FC, PropsWithChildren } from 'react';
import PlazaText, { PlazaTextProps } from './PlazaText';

const SubheaderText: FC<PropsWithChildren<PlazaTextProps>> = ({
  children,
  style,
}) => {
  return (
    <PlazaText fontSize={16} fontWeight="medium" style={style}>
      {children}
    </PlazaText>
  );
};

export default SubheaderText;
