'use client';
import Hls from 'hls.js';
import { useContext, useEffect, useState } from 'react';

import { AudioContext } from '../providers/AudioContext';

const useAudio = () => {
  const { state } = useContext(AudioContext);
  const [isError, setIsError] = useState<boolean>(false);
  const [status, setStatus] = useState('');
  const [playtime, setPlaytime] = useState(0);

  // let audioRef = useRef<HTMLAudioElement>(null);

  // useEffect(()=>{
  //   audioRef.current = new Audio()
  // },[])

  useEffect(() => {
    const audioElement = new Audio(state.station.stationurl);
    const hlsPlayback = new Hls();
    audioElement.preload = 'auto';

    const trackplaytime = () => {
      setPlaytime(parseInt(audioElement.currentTime.toFixed(0)));
    };
    const intervalFunc = setInterval(trackplaytime, 1000);

    const play = () => {
      setIsError(false);
      audioElement.play().catch(() => {
        setIsError(true);
        setStatus('Unable to play track');
      });
    };
    const playing = () => {
      setIsError(false);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: state.station.name,
          artist: state.station.name,
          album: state.station.name,
          artwork: [
            {
              src: `/api/image?url=${encodeURIComponent(
                state.station.favicon
              )}`,
            },
          ],
        });
        navigator.mediaSession.setActionHandler('play', () => {
          load();
        });
        navigator.mediaSession.setActionHandler('pause', () => {
          audioElement.pause();
          setStatus('Paused');
        });
        navigator.mediaSession.setActionHandler('stop', () => {
          audioElement.pause();
          setStatus('Paused');
        });
      }
      setStatus('playing');
    };
    const paused = () => {
      setStatus('Paused');
    };
    const errored = () => {
      // console.log(e);
      setStatus('Unable to play Track');
      setIsError(true);
    };
    const stalled = () => {
      setStatus('Reloading...');
      load();
      setIsError(true);
    };
    const offline = () => {
      setStatus('No Internet');
      setIsError(true);
    };
    const online = () => {
      if (audioElement.HAVE_ENOUGH_DATA) {
        load();
        setStatus('playing');
      }
    };
    audioElement.addEventListener('playing', playing);
    audioElement.addEventListener('pause', paused);
    // hlsPlayback.on(Hls.Events.)
    audioElement.addEventListener('stalled', stalled);
    window.addEventListener('offline', offline);
    window.addEventListener('online', online);
    const load = () => {
      if (state.isPlaying) {
        setStatus('loading');
        if (state.station.hls) {
          if (audioElement.canPlayType('application/vnd.apple.mpegurl')) {
            audioElement.onloadedmetadata = () => {
              play();
            };
          } else {
            hlsPlayback.loadSource(state.station.stationurl);
            hlsPlayback.attachMedia(audioElement);
            hlsPlayback.on(Hls.Events.MANIFEST_PARSED, () => {
              play();
            });
          }
        } else {
          audioElement.load();
          play();
        }
      } else {
        audioElement.pause();
        setStatus('Paused');
      }
    };
    load();

    return () => {
      audioElement.removeEventListener('playing', playing);
      audioElement.removeEventListener('pause', paused);
      audioElement.removeEventListener('error', errored);
      audioElement.removeEventListener('stalled', stalled);
      window.removeEventListener('offline', offline);
      window.removeEventListener('online', online);
      clearInterval(intervalFunc);
      audioElement.pause();
      hlsPlayback.stopLoad();
    };
  }, [state]);

  return { isError, status, playtime };
};

export default useAudio;
