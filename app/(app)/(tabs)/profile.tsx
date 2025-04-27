import { useAuth } from '@/contexts/AuthContext';
import AnonymousPrompt from '@/screens/Anonymous';
import Profile from '@/screens/Profile';

const ProfileScreen = () => {
  const { user, session } = useAuth();
  const isAnonymous = session?.user.is_anonymous;
  if (isAnonymous) {
    return <AnonymousPrompt />;
  }

  if (!user) {
    return null;
  }

  return <Profile userId={user?.id} />;
};

export default ProfileScreen;
