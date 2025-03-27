import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import CaptionText from './Texts/CaptionText';
import ProfileIcon from './ProfileIcon';
import Spacing from '@/constants/Spacing';
import Rating from './Rating';
import StandardText from './Texts/StandardText';

interface UserInfoProps {
  imageUrl?: string;
  name: string;
  description: string;
}

const UserInfo: FC<UserInfoProps> = ({ imageUrl, name, description }) => {
  return (
    <View style={styles.container}>
      <ProfileIcon variant="user" url={imageUrl} />
      <View>
        <StandardText>{name}</StandardText>
        {/* <CaptionText>{description}</CaptionText> */}
        <View style={{ marginTop: Spacing.SPACING_1 }}>
          <Rating rating={5} />
        </View>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.SPACING_2,
  },
});
