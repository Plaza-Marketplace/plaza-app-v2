import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { VideoFile } from 'react-native-vision-camera';

interface RecordedVideoContextValue {
  recordedVideo: VideoFile | null;
  setRecordedVideo: (videoUri: VideoFile | null) => void;
}

export const RecordedVideoContext = createContext<RecordedVideoContextValue>(
  {} as RecordedVideoContextValue
);

export const useRecordedVideo = () => {
  const context = useContext(RecordedVideoContext);
  if (!context) {
    throw new Error(
      'useRecordedVideo must be used within a RecordedVideoProvider'
    );
  }
  return context;
};

export const RecordedVideoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [recordedVideo, setRecordedVideo] = useState<VideoFile | null>(null);

  return (
    <RecordedVideoContext.Provider value={{ recordedVideo, setRecordedVideo }}>
      {children}
    </RecordedVideoContext.Provider>
  );
};
