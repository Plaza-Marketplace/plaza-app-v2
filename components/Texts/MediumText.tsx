import { FC, PropsWithChildren } from 'react';
import PlazaText, { PlazaTextProps } from './PlazaText';

const MediumText: FC<PropsWithChildren<PlazaTextProps>> = ({
  children,
  ...rest
}) => {
  return (
    <PlazaText fontSize={14} fontWeight="medium" {...rest}>
      {children}
    </PlazaText>
  );
};

export default MediumText;
