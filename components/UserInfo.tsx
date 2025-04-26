import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileIcon from './ProfileIcon';
import BodyText from './Texts/BodyText';

interface UserInfoProps {
  username: string;
  displayName?: string;
  profilePictureUrl: Url | null;
}

const UserInfo: FC<UserInfoProps> = ({
  username,
  displayName,
  profilePictureUrl,
}) => {
  return (
    <View style={styles.container}>
      <ProfileIcon variant="user" url={profilePictureUrl ?? undefined} />
      <BodyText variant="md-medium">{displayName ?? username}</BodyText>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
