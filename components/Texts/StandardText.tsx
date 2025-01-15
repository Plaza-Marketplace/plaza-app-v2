import { FC, PropsWithChildren } from 'react';
import PlazaText, { PlazaTextProps } from './PlazaText';

const StandardText: FC<PropsWithChildren<PlazaTextProps>> = ({
  children,
  ...props
}) => {
  return (
    <PlazaText fontSize={14} {...props}>
      {children}
    </PlazaText>
  );
};

export default StandardText;
