import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabBarProps } from 'react-native-collapsible-tab-view';
import HeadingText from '../Texts/HeadingText';
import Color from '@/constants/Color';
import PressableOpacity from '../Buttons/PressableOpacity';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

interface CollapsibleTabBarProps extends TabBarProps {}

const CollapsibleTabBar: FC<CollapsibleTabBarProps> = ({
  indexDecimal,
  tabNames,
  focusedTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      {tabNames.map((tabName, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          borderBottomWidth: focusedTab.value === tabName ? 2 : 0,
          borderColor:
            focusedTab.value === tabName
              ? Color.PRIMARY_DEFAULT
              : 'transparent',
        }));

        const textAniamtedStyle = useAnimatedStyle(() => ({
          color:
            focusedTab.value === tabName
              ? Color.PRIMARY_DEFAULT
              : Color.NEUTRALS_300,
        }));

        return (
          <PressableOpacity
            onPress={() => onTabPress(tabName)}
            style={styles.tabContainer}
            key={index}
          >
            <Animated.View style={[styles.tab, animatedStyle]}>
              <Animated.Text style={[textAniamtedStyle, styles.text]}>
                {tabName}
              </Animated.Text>
            </Animated.View>
          </PressableOpacity>
        );
      })}
    </View>
  );
};

export default CollapsibleTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.WHITE,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 12,
  },
  focusedTab: {
    borderBottomWidth: 2,
    borderColor: Color.PRIMARY_DEFAULT,
  },
  text: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
});
