import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBookmark = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" viewBox="0 0 32 32" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24 9.333V28l-8-5.333L8 28V9.333A5.333 5.333 0 0 1 13.333 4h5.334A5.333 5.333 0 0 1 24 9.333"
    />
  </Svg>
);
export default SvgBookmark;
