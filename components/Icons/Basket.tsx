import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBasket = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" viewBox="0 0 32 32" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14.667V8a4 4 0 1 1 8 0v6.667m-11.559-4H23.56a2.666 2.666 0 0 1 2.636 3.072l-1.673 10.869A4 4 0 0 1 20.568 28h-9.136a4 4 0 0 1-3.953-3.392l-1.674-10.87a2.667 2.667 0 0 1 2.636-3.071"
    />
  </Svg>
);
export default SvgBasket;
