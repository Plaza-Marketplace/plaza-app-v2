import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCreate = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" viewBox="0 0 32 32" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16h8m16 0h-8M16 4v8m0 8v8M7.515 7.515l5.657 5.657m11.313 11.313-5.657-5.657m5.657-11.313-5.657 5.657m-5.656 5.656-5.657 5.657"
    />
  </Svg>
);
export default SvgCreate;
