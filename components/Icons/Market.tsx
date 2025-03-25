import * as React from 'react';
import Svg, { G, Path, Defs } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from 'react-native-svg';
const SvgMarket = (props: SvgProps) => (
  <Svg width={40} height={37} fill="none" viewBox="0 0 40 37" {...props}>
    <G filter="url(#a)">
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 28h30M5 9.333v1.334c0 1.06.527 2.078 1.464 2.828.938.75 2.21 1.172 3.536 1.172s2.598-.422 3.536-1.172c.937-.75 1.464-1.767 1.464-2.828M5 9.333h30m-30 0L8.333 4h23.334L35 9.333m-20 1.334V9.333m0 1.334c0 1.06.527 2.078 1.465 2.828.937.75 2.209 1.172 3.535 1.172s2.598-.422 3.535-1.172S25 11.728 25 10.667m0 0V9.333m0 1.334c0 1.06.527 2.078 1.465 2.828.937.75 2.209 1.172 3.535 1.172s2.598-.422 3.535-1.172S35 11.728 35 10.667V9.333M8.333 28V14.467M31.667 28V14.467M15 28v-5.333c0-.708.351-1.386.976-1.886S17.45 20 18.333 20h3.334c.884 0 1.732.281 2.357.781S25 21.959 25 22.667V28"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default SvgMarket;
