import { SelectedProductsProvider } from '@/contexts/SelectedProductsContext';
import { Stack } from 'expo-router';

const VideoUpload = () => {
  return (
    <SelectedProductsProvider>
      <Stack
        initialRouteName="landing-page"
        screenOptions={{ headerShown: false }}
      />
    </SelectedProductsProvider>
  );
};

export default VideoUpload;
