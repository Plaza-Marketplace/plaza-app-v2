import { Session } from '@supabase/supabase-js';
import React, { useContext } from 'react';

const AuthContext = React.createContext<Session | null>(null);

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};

export default AuthContext;
