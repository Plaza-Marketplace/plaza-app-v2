import { supabase } from '@/utils/supabase';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Alert, ViewStyle } from 'react-native';
import PlazaButton from '../Buttons/PlazaButton';
import { Ionicons } from '@expo/vector-icons';
import Color from '@/constants/Color';
import { styles } from './styles';
import { FC } from 'react';
import PressableOpacity from '../Buttons/PressableOpacity';
import Radius from '@/constants/Radius';
import BodyText from '../Texts/BodyText';
import HeadingText from '../Texts/HeadingText';
import { GoogleLogo } from '../Icons';
import Spacing from '@/constants/Spacing';

interface GoogleOAuthProps {
  style?: ViewStyle;
}

const GoogleOAuth: FC<GoogleOAuthProps> = ({ style }) => {
  GoogleSignin.configure({
    scopes: ['profile'],
    iosClientId:
      '1039660036666-0vh7t5g63rqfo08m3ai7kmfiab08a2ho.apps.googleusercontent.com',
  });

  return (
    <PressableOpacity
      style={[styles.buttonStyle, style]}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          if (userInfo.data.idToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: userInfo.data.idToken,
            });
            console.log(error, data);
          } else {
            throw new Error('no ID token present!');
          }
        } catch (error: any) {
          Alert.alert('Google Sign-In Error', error.message);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      }}
    >
      <GoogleLogo />
      <HeadingText style={{ marginLeft: Spacing.SPACING_2 }} variant="h6">
        Sign in with Google
      </HeadingText>
    </PressableOpacity>
  );
};

export default GoogleOAuth;
