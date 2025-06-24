import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileIcon from '../ProfileIcon';
import BodyText from '../Texts/BodyText';

interface UserInfoProps {
  username: string;
  displayName?: string;
  profilePictureUrl: Url | null;
  size?: number
}

const UserInfo: FC<UserInfoProps> = ({
  username,
  displayName,
  profilePictureUrl,
  size=32,
}) => {
  return (
    <View style={styles.container}>
      <ProfileIcon variant="user" url={profilePictureUrl || undefined} size={size}/>
      <BodyText variant="md-medium" numberOfLines={1} style={{ flexShrink: 1 }}>
        {displayName ?? username}
      </BodyText>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
