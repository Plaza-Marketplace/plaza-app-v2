import { FC } from 'react';
import PlazaText, { PlazaTextProps } from './PlazaText';

const MediumText: FC<PlazaTextProps> = ({ children, ...rest }) => {
  return (
    <PlazaText fontSize={14} fontWeight="medium" {...rest}>
      {children}
    </PlazaText>
  );
};

export default MediumText;
