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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};
