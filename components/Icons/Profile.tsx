import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgProfile = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" viewBox="0 0 32 32" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 28v-2.667A5.333 5.333 0 0 1 13.333 20h5.334A5.333 5.333 0 0 1 24 25.333V28M10.667 9.333a5.333 5.333 0 1 0 10.667 0 5.333 5.333 0 0 0-10.667 0"
    />
  </Svg>
);
export default SvgProfile;
