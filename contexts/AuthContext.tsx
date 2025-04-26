import { identify } from '@/analytics/utils';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextValue {
  isLoading: boolean;
  session: Session | null;
  setSession: (session: Session | null) => void;
  user: User | undefined;
}

export const AuthContext = React.createContext<AuthContextValue>(
  {} as AuthContextValue
);

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const { data: user } = useGetUserByAuthId(session?.user.id);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user.id) {
        identify(session.user.id);
      }

      const newSession =
        session && session.user.app_metadata.provider === 'apple'
          ? {
              ...session,
              user: {
                ...session.user,
                user_metadata: {
                  ...session.user.user_metadata,
                  completed_onboarding: true,
                },
              },
            }
          : session;

      setSession(newSession);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, session, setSession, user }}>
      {children}
    </AuthContext.Provider>
  );
};
