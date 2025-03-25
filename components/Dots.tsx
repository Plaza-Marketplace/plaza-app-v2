import Color from '@/constants/Color';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface DotsProps {
  count: number;
  activeIndex: number;
}

const Dots: FC<DotsProps> = ({ count, activeIndex }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                index === activeIndex
                  ? Color.PRIMARY_DEFAULT
                  : Color.NEUTRALS_200,
            },
          ]}
        />
      ))}
    </View>
  );
};

export default Dots;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
