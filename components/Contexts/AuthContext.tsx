import { Session } from '@supabase/supabase-js';
import React from 'react';

const AuthContext = React.createContext<Session | null>(null);

export default AuthContext;
