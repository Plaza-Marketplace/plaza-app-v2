import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPlaza = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" viewBox="0 0 32 32" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 28v-2.667A5.333 5.333 0 0 1 9.333 20h5.334A5.333 5.333 0 0 1 20 25.333V28m1.333-23.827a5.333 5.333 0 0 1 0 10.334M28 28v-2.667a5.334 5.334 0 0 0-4-5.133M6.667 9.333a5.333 5.333 0 1 0 10.667 0 5.333 5.333 0 0 0-10.667 0"
    />
  </Svg>
);
export default SvgPlaza;
