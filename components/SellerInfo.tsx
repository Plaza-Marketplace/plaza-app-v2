import { StyleSheet, View } from 'react-native';
import ProfileIcon from './ProfileIcon';
import BodyText from './Texts/BodyText';
import { FC } from 'react';
import Rating from './Rating';

interface SellerInfoProps {
  id: Id;

  username: string;

  profilePictureUrl: Url | null;

  averageRating: number;
}

const SellerInfo: FC<SellerInfoProps> = ({
  id,
  username,
  profilePictureUrl,
  averageRating,
}) => {
  return (
    <View style={styles.container}>
      <ProfileIcon
        variant="user"
        size={32}
        url={profilePictureUrl ?? undefined}
      />
      <View style={styles.info}>
        <BodyText variant="sm-medium">{username}</BodyText>
        <Rating rating={averageRating} />
      </View>
    </View>
  );
};

export default SellerInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  info: {
    gap: 4,
  },
});
