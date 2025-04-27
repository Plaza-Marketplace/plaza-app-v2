import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgUpload = (props: SvgProps) => (
  <Svg width={20} height={24} fill="none" viewBox="0 0 20 24" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2 16.5v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2m-13-8 5-5m0 0 5 5m-5-5v12"
    />
  </Svg>
);
export default SvgUpload;
