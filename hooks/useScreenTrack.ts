import { Event, track } from '@/analytics/utils';
import { useEffect } from 'react';

const useScreenTrack = (event: Event, properties?: Record<string, any>) => {
  useEffect(() => {
    track(event, properties);
  }, []);
};

export default useScreenTrack;
