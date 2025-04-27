import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgJewelry = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2.667a.67.67 0 0 1 .522.252l.05.072 2 3.333a.67.67 0 0 1-.022.719l-.053.068-5.687 6.356a1.13 1.13 0 0 1-1.55.062l-.09-.084L1.503 7.11A.67.67 0 0 1 1.39 6.4l.04-.077 2.008-3.348.043-.06a.7.7 0 0 1 .103-.102l.06-.043.058-.033.034-.016.04-.016.072-.022.075-.013L4 2.667zM6.076 5.295a.667.667 0 0 0-.914.229l-.4.667-.04.077a.67.67 0 0 0 .118.713l1.333 1.467.06.059a.67.67 0 0 0 .882-.014l.058-.06a.67.67 0 0 0-.013-.882l-1-1.1.145-.242.036-.068a.667.667 0 0 0-.265-.846"
    />
  </Svg>
);
export default SvgJewelry;
