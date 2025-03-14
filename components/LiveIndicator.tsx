import { StyleSheet, View } from 'react-native';
import BodyText from './Texts/BodyText';
import Circle from './Circle';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';

const LiveIndicator = () => {
  return (
    <View style={styles.container}>
      <Circle size={4} style={styles.circle} />
      <BodyText variant="md-medium" color={Color.LIVES_500}>
        Live
      </BodyText>
    </View>
  );
};

export default LiveIndicator;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
    borderRadius: Radius.SM,
    backgroundColor: Color.LIVES_100,
  },
  circle: {
    backgroundColor: Color.LIVES_500,
  },
});
