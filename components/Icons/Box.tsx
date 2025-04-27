import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBox = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7.5 12 3 4 7.5m16 0v9L12 21m8-13.5L12 12m0 9-8-4.5v-9M12 21v-9M4 7.5l8 4.5m4-6.75-8 4.5"
    />
  </Svg>
);
export default SvgBox;
