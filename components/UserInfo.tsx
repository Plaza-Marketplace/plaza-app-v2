import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import CaptionText from './Texts/CaptionText';
import ProfileIcon from './ProfileIcon';
import Spacing from '@/constants/Spacing';

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
        <CaptionText>{name}</CaptionText>
        {/* <CaptionText>{description}</CaptionText> */}
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
