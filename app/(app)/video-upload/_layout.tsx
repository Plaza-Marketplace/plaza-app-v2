import { RecordedVideoProvider } from '@/contexts/RecordedVideoProvider';
import { SelectedProductsProvider } from '@/contexts/SelectedProductsContext';
import { Stack } from 'expo-router';

const VideoUpload = () => {
  return (
    <SelectedProductsProvider>
      <RecordedVideoProvider>
        <Stack
          initialRouteName="landing-page"
          screenOptions={{ headerShown: false }}
        />
      </RecordedVideoProvider>
    </SelectedProductsProvider>
  );
};

export default VideoUpload;
