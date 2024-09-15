import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  I18nManager,
  LayoutChangeEvent,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const DISTANCE_BETWEEN_TABS = 60;

const PlazaTabBar = ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps): JSX.Element => {
  const [widths, setWidths] = useState<(number | undefined)[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const transform = [];
  const inputRange = state.routes.map((_, i) => i);

  // keep a ref to easily scroll the tab bar to the focused label
  const outputRangeRef = useRef<number[]>([]);

  const getTranslateX = (
    position: Animated.AnimatedInterpolation<number>,
    routes: never[],
    widths: number[]
  ) => {
    const outputRange = routes.reduce((acc, _, i: number) => {
      if (i === 0) return [DISTANCE_BETWEEN_TABS / 2 + widths[0] / 2];
      return [
        ...acc,
        acc[i - 1] + widths[i - 1] / 2 + widths[i] / 2 + DISTANCE_BETWEEN_TABS,
      ];
    }, [] as number[]);
    outputRangeRef.current = outputRange;
    const translateX = position.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });
    return Animated.multiply(translateX, I18nManager.isRTL ? -1 : 1);
  };

  // compute translateX and scaleX because we cannot animate width directly
  if (
    state.routes.length > 1 &&
    widths.length === state.routes.length &&
    !widths.includes(undefined)
  ) {
    const translateX = getTranslateX(
      position,
      state.routes as never[],
      widths as number[]
    );
    transform.push({
      translateX,
    });
    const outputRange = inputRange.map((_, i) => widths[i]) as number[];
    transform.push({
      scaleX:
        state.routes.length > 1
          ? position.interpolate({
              inputRange,
              outputRange,
              extrapolate: 'clamp',
            })
          : outputRange[0],
    });
  }

  // scrolls to the active tab label when a new tab is focused
  useEffect(() => {
    if (
      state.routes.length > 1 &&
      widths.length === state.routes.length &&
      !widths.includes(undefined)
    ) {
      if (state.index === 0) {
        scrollViewRef.current?.scrollTo({
          x: 0,
        });
      } else {
        // keep the focused label at the center of the screen
        scrollViewRef.current?.scrollTo({
          x: (outputRangeRef.current[state.index] as number) - screenWidth / 2,
        });
      }
    }
  }, [state.index, state.routes.length, widths]);

  // get the label widths on mount
  const onLayout = (event: LayoutChangeEvent, index: number) => {
    const { width } = event.nativeEvent.layout;
    const newWidths = [...widths];
    newWidths[index] = width - DISTANCE_BETWEEN_TABS;
    setWidths(newWidths);
  };

  // basic labels as suggested by react navigation
  const labels = state.routes.map((route, index) => {
    const { options } = descriptors[route.key];
    const label = options.title ? options.title : route.name;
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        // eslint-disable-next-line
        // @ts-ignore
        navigation.navigate({ name: route.name, merge: true });
      }
    };
    const inputRange = state.routes.map((_, i) => i);
    const opacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
    });

    return (
      <TouchableOpacity
        key={route.key}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        onPress={onPress}
        style={styles.button}
      >
        <View
          onLayout={(event) => onLayout(event, index)}
          style={styles.buttonContainer}
        >
          <Animated.Text style={[styles.text, { opacity }]}>
            {label}
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.contentContainer}>
      <Animated.ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {labels}
        <Animated.View style={[styles.indicator, { transform }]} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingHorizontal: DISTANCE_BETWEEN_TABS / 2,
  },
  container: {
    flexDirection: 'row',
    height: 34,
    alignSelf: 'center',
  },
  contentContainer: {
    height: 34,
    width: '95%',
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  indicator: {
    backgroundColor: 'black',
    bottom: 0,
    height: 2,
    left: 0,
    position: 'absolute',
    right: 0,
    // this must be 1 for the scaleX animation to work properly
    width: 1,
  },
  text: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default PlazaTabBar;
