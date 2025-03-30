import * as React from 'react';
import Svg, { G, Path, Defs } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from 'react-native-svg';
const SvgComment = (props: SvgProps) => (
  <Svg width={35} height={36} fill="none" viewBox="0 0 35 36" {...props}>
    <G filter="url(#a)">
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m5 26.667 1.733-5.2c-3.098-4.583-1.901-10.496 2.8-13.832 4.702-3.335 11.454-3.062 15.794.64s4.926 9.688 1.372 14c-3.555 4.314-10.154 5.62-15.432 3.058z"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default SvgComment;
