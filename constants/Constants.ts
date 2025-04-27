import { Dimensions, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const staticSafeAreaInsets = initialWindowMetrics?.insets || {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

export const CONTENT_SPACING = 15;

const SAFE_BOTTOM =
  Platform.select({
    ios: staticSafeAreaInsets.bottom,
  }) ?? 0;

export const SAFE_AREA_PADDING = {
  paddingLeft: staticSafeAreaInsets.left + CONTENT_SPACING,
  paddingTop: staticSafeAreaInsets.top + CONTENT_SPACING,
  paddingRight: staticSafeAreaInsets.right + CONTENT_SPACING,
  paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
};

// The maximum zoom _factor_ you should be able to zoom in
export const MAX_ZOOM_FACTOR = 10;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Platform.select<number>({
  android: Dimensions.get('screen').height - staticSafeAreaInsets.bottom,
  ios: Dimensions.get('window').height,
}) as number;

// Capture Button
export const CAPTURE_BUTTON_SIZE = 78;

// Control Button like Flash
export const CONTROL_BUTTON_SIZE = 40;
