import Color from '@/constants/Color';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import BodyText from '../Texts/BodyText';
import { Person } from '../Icons';
import Radius from '@/constants/Radius';

interface MemberCountProps {
  count: number;
}

const MemberCount: FC<MemberCountProps> = ({ count }) => {
  return (
    <View style={styles.container}>
      <Person color={Color.PRIMARY_DEFAULT} />
      <BodyText variant="sm-medium" color={Color.PRIMARY_DEFAULT}>
        {`${count} ${count === 1 ? 'member' : 'members'}`}
      </BodyText>
    </View>
  );
};

export default MemberCount;

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.SM,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    gap: 4,
    backgroundColor: Color.PRIMARY_100,
  },
});
