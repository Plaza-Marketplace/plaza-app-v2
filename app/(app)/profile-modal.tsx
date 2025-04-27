import { useLocalSearchParams } from 'expo-router';
import Profile from '@/screens/Profile';

const ProfileModal = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = parseInt(id);

  return <Profile userId={userId} />;
};

export default ProfileModal;
