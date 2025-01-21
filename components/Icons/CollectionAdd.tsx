import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCollectionAdd = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" viewBox="0 0 32 32" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M4 27.568V12h24v15.568c-.002.644-.29 1.262-.801 1.717a2.9 2.9 0 0 1-1.926.715H6.727a2.9 2.9 0 0 1-1.926-.715c-.51-.455-.799-1.073-.801-1.717M17 18a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      stroke="#fff"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M27.25 5H4.75C3.784 5 3 5.627 3 6.4v1.2C3 8.373 3.784 9 4.75 9h22.5C28.216 9 29 8.373 29 7.6V6.4c0-.773-.784-1.4-1.75-1.4Z"
    />
  </Svg>
);
export default SvgCollectionAdd;
