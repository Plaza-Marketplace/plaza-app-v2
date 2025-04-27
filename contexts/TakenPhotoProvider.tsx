import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { PhotoFile } from 'react-native-vision-camera';

interface TakenPhotoContextValue {
  takenPhoto: PhotoFile | null;
  setTakenPhoto: (videoUri: PhotoFile | null) => void;
}

export const TakenPhotoContext = createContext<TakenPhotoContextValue>(
  {} as TakenPhotoContextValue
);

export const useTakenPhoto = () => {
  const context = useContext(TakenPhotoContext);
  if (!context) {
    throw new Error(
      'useRecordedVideo must be used within a RecordedVideoProvider'
    );
  }
  return context;
};

export const TakenPhotoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [takenPhoto, setTakenPhoto] = useState<PhotoFile | null>(null);

  return (
    <TakenPhotoContext.Provider value={{ takenPhoto, setTakenPhoto }}>
      {children}
    </TakenPhotoContext.Provider>
  );
};
