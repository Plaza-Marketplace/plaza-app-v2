import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPottery = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 8h2a4 4 0 0 0 4-4v-.667h-2a4 4 0 0 0-4 4H6a4 4 0 0 1-4-4V2h2a4 4 0 0 1 4 4v4m-3.333 0h6.666v2.667A1.333 1.333 0 0 1 10 14H6a1.334 1.334 0 0 1-1.333-1.333z"
    />
  </Svg>
);
export default SvgPottery;
