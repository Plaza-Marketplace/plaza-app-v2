import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgReview = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" viewBox="0 0 32 32" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m16 23.667-8.23 4.326 1.573-9.164-6.667-6.49 9.2-1.332 4.115-8.338 4.114 8.338 9.2 1.333-6.666 6.49 1.572 9.163z"
    />
  </Svg>
);
export default SvgReview;
