import { useAuth } from '@/contexts/AuthContext';
import Profile from '@/screens/Profile';

const ProfileScreen = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return <Profile userId={user?.id} />;
};

export default ProfileScreen;
