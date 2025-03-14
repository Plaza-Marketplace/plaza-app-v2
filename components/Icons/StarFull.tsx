import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgStarFull = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={props.color}
      d="m5.495 4.893-4.253.617-.075.015a.667.667 0 0 0-.294 1.123l3.082 3-.727 4.236-.009.073a.666.666 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.665.665 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L8.593 1.04a.667.667 0 0 0-1.196 0z"
    />
  </Svg>
);
export default SvgStarFull;
