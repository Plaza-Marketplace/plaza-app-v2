import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHeartInactive = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" viewBox="0 0 32 32" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m26 16.763-10 9.904-10-9.904a6.666 6.666 0 1 1 10-8.755 6.665 6.665 0 0 1 11.36 1.168A6.67 6.67 0 0 1 26 16.77"
    />
  </Svg>
);
export default SvgHeartInactive;
