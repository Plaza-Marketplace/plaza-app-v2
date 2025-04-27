import { Platform, ViewStyle } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '@/utils/supabase';
import Radius from '@/constants/Radius';
import { FC } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

interface AppleSignInButtonProps {
  style?: ViewStyle;
}

const AppleSignInButton: FC<AppleSignInButtonProps> = ({ style }) => {
  const { session, setSession } = useAuth();

  if (Platform.OS === 'ios')
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={
          AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
        }
        cornerRadius={Radius.ROUNDED}
        style={[
          {
            height: 55,
          },
          style,
        ]}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // Sign in via Supabase Auth.
            console.log(credential);
            if (credential.identityToken) {
              const {
                error,
                data: { user, session },
              } = await supabase.auth.signInWithIdToken({
                provider: 'apple',
                token: credential.identityToken,
              });
              console.log(user?.id);
              if (!error && session) {
                // User is signed in.
                await supabase.auth.updateUser({
                  data: {
                    completed_onboarding: true,
                  },
                });
              }
            } else {
              throw new Error('No identityToken.');
            }
          } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              console.log(e);
            }
          }
        }}
      />
    );

  return null;
};

export default AppleSignInButton;
