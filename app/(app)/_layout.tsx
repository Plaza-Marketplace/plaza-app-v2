import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function AppLayout() {
  const { session, isLoading } = useAuth();

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!isLoading && !session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/onboarding/welcome" />;
  }
  // the user created an account but hasn't filled out their account details yet
  if (
    !isLoading &&
    session &&
    !session.user.user_metadata?.completed_onboarding
  ) {
    console.log(session.user.user_metadata);
    return <Redirect href="/onboarding/account-details" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack screenOptions={{ headerShown: false }} />;
}
