import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import CaptionText from './Texts/CaptionText';
import Color from '@/constants/Color';

interface NotificationNumberProps {
  notificationsCount: number;
}

const NotificationNumber: FC<NotificationNumberProps> = ({
  notificationsCount,
}) => {
  return (
    <View style={styles.container}>
      <CaptionText>
        {notificationsCount > 99 ? '99+' : notificationsCount}
      </CaptionText>
    </View>
  );
};

export default NotificationNumber;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Color.SURFACE_SECONDARY,
  },
});
