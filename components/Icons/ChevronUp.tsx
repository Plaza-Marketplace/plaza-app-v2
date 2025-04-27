import * as React from 'react';
import Svg, { G, Path, Defs } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from 'react-native-svg';
const SvgChevronUp = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <G filter="url(#a)">
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m6 15 6-6 6 6"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default SvgChevronUp;
