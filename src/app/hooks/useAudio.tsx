import Hls from 'hls.js';
import React, { useContext, useEffect, useState } from 'react';

import { AudioContext } from '../providers/AudioContext';

const useAudio = (audioRef: React.RefObject<HTMLAudioElement>) => {
  const { dispatch, state } = useContext(AudioContext);
  const [error, setError] = useState('');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;
    const { station } = state;
    const play = () => {
      if (!audioElement) return;

      if (station.hls === 0) {
        audioElement.load();
        audioElement.play().catch(() => {
          setError('Unable to play track');
        });
      } else {
        const hlsPlayback = new Hls();
        if (audioElement.canPlayType('application/vnd.apple.mpegurl')) {
          audioElement.onloadedmetadata = () => {
            audioElement.play();
          };
        }
        hlsPlayback.loadSource(`/api/audio?audiolink=${station.stationurl}`);

        hlsPlayback.attachMedia(audioElement);
        hlsPlayback.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          data.levels.map((level) => {
            return { ...level, url: `/api/audio?audiolink=${level.url}` };
          });
          console.log(event, data.levels);
        });
        hlsPlayback.on(Hls.Events.MANIFEST_PARSED, () => {
          audioElement.play();
        });
      }
      setIsAudioPlaying(true);
    };
    const pause = () => {
      if (!audioElement) return;
      audioElement.pause();
      setIsAudioPlaying(false);
    };
    if (state.isPlaying) {
      play();
    } else {
      pause();
    }
  }, [audioRef, dispatch, state]);

  return { isAudioPlaying, error };
};

export default useAudio;
