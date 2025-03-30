import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgInbox = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" viewBox="0 0 32 32" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.333 17.333h4l4 4h5.334l4-4h4M5.333 8A2.667 2.667 0 0 1 8 5.333h16A2.667 2.667 0 0 1 26.667 8v16A2.666 2.666 0 0 1 24 26.667H8A2.667 2.667 0 0 1 5.333 24z"
    />
  </Svg>
);
export default SvgInbox;
