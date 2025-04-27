import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCamera = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" viewBox="0 0 32 32" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m20 13.333 6.07-3.034A1.333 1.333 0 0 1 28 11.49v9.018a1.333 1.333 0 0 1-1.93 1.192L20 18.667zM4 10.667A2.667 2.667 0 0 1 6.667 8h10.666A2.667 2.667 0 0 1 20 10.667v10.666A2.667 2.667 0 0 1 17.333 24H6.667A2.667 2.667 0 0 1 4 21.333z"
    />
  </Svg>
);
export default SvgCamera;
