import Hls from 'hls.js';
import { useContext, useEffect, useState } from 'react';

import { AudioContext } from '../providers/AudioContext';

const audioElement = new Audio();
const hlsPlayback = new Hls();
const useAudio = () => {
  const { state } = useContext(AudioContext);
  const [isError, setIsError] = useState<boolean>(false);
  const [status, setStatus] = useState('');
  const [playtime, setPlaytime] = useState(0);

  useEffect(() => {
    audioElement.src = state.station.stationurl;

    const trackplaytime = () => {
      setPlaytime(parseInt(audioElement.currentTime.toFixed(0)));
    };
    const intervalFunc = setInterval(trackplaytime, 1000);

    const play = () => {
      setIsError(false);
      audioElement.play();
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
      }
      setStatus('playing');
    };
    const paused = () => {
      setStatus('Paused');
    };
    const errored = () => {
      setStatus('Unable to play Track');
      setIsError(true);
    };
    const stalled = () => {
      setStatus('Player stalled');
      setIsError(true);
    };
    const offline = () => {
      setStatus('No Internet');
      setIsError(true);
    };
    const online = () => {
      if (audioElement.HAVE_ENOUGH_DATA) {
        play();
        setStatus('playing');
      }
    };
    audioElement.addEventListener('playing', playing);
    audioElement.addEventListener('pause', paused);
    audioElement.addEventListener('error', errored);
    audioElement.addEventListener('stalled', stalled);
    hlsPlayback.on(Hls.Events.ERROR, errored);
    hlsPlayback.off(Hls.Events.ERROR, playing);
    window.addEventListener('offline', offline);
    window.addEventListener('online', online);
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

    return () => {
      audioElement.removeEventListener('playing', playing);
      audioElement.removeEventListener('pause', paused);
      audioElement.removeEventListener('error', errored);
      audioElement.removeEventListener('stalled', stalled);
      window.removeEventListener('offline', offline);
      window.removeEventListener('online', online);
      clearInterval(intervalFunc);
      audioElement.remove();
    };
  }, [state]);

  return { isError, status, playtime };
};

export default useAudio;
