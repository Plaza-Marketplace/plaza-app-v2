import { Event, track } from '@/analytics/utils';
import { useEffect } from 'react';

const useModalTrack = (
  event: Event,
  isOpen: boolean,
  properties?: Record<string, any>
) => {
  useEffect(() => {
    if (isOpen) {
      track(event, properties);
    }
  }, [isOpen]);
};

export default useModalTrack;
