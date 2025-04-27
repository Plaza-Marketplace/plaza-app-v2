import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgKnitting = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.667 4.333 11 5m.333-.333C9.778 2.889 9 2 8 2s-1.333.667-1.333 1.333c0 2.667 5.44 5.604 4 7.334-.704.845-2.242.856-3.834.538m-3.007-.922C2.897 9.907 1.333 9 1.333 8M13 6.333l1 1M2 14q-.667-.666 7.857-11.14a2.334 2.334 0 1 1 3.385 3.195Q2.667 14.667 2 14"
    />
  </Svg>
);
export default SvgKnitting;
