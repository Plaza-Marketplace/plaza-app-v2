import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPerson = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 14v-1.333A2.667 2.667 0 0 1 6.667 10h2.666A2.667 2.667 0 0 1 12 12.667V14M5.333 4.667a2.667 2.667 0 1 0 5.334 0 2.667 2.667 0 0 0-5.334 0"
    />
  </Svg>
);
export default SvgPerson;
