import { FC } from 'react';
import { Image } from 'react-native';

const DEFAULT_PROFILE_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';

interface ProfileIconProps {
  url?: string;
  variant: 'user' | 'community';
  size?: number;
}

const ProfileIcon: FC<ProfileIconProps> = ({ url, variant, size = 32 }) => {
  return variant === 'user' ? (
    <Image
      source={{ uri: url ?? DEFAULT_PROFILE_ICON_URL }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    />
  ) : (
    <Image
      source={{ uri: url ?? DEFAULT_PROFILE_ICON_URL }}
      style={{ width: size, height: size, borderRadius: size / 4 }}
    />
  );
};

export default ProfileIcon;
