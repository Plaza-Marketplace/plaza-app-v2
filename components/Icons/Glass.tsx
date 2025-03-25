import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGlass = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.333 14h5.334M8 10.667V14m0-3.333c2.21 0 4-1.326 4-3.334l-.667-4M8 10.667c-2.21 0-4-1.326-4-3.334l.667-4m6.666 0c0 .354-.35.693-.976.943-.625.25-1.473.39-2.357.39s-1.732-.14-2.357-.39-.976-.589-.976-.943m6.666 0c0-.353-.35-.692-.976-.942C9.732 2.14 8.884 2 8 2s-1.732.14-2.357.39-.976.59-.976.943"
    />
  </Svg>
);
export default SvgGlass;
