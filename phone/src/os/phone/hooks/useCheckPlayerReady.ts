import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { phoneState } from './state';
import { fetchNui } from '../../../utils/fetchNui';
import { PhoneEvents } from '../../../../../typings/phone';
import { ServerPromiseResp } from '../../../../../typings/common';
import { isEnvBrowser } from '../../../utils/misc';

interface CheckPlayerReady {
  updateReadyState: () => void;
  isPlayerReady: boolean;
}

const fetchReadyStatus = async () => {
  try {
    const serverResp = await fetchNui<ServerPromiseResp<boolean>>(PhoneEvents.CHECK_READY);
    if (serverResp.status !== 'ok') return;
    return serverResp.data;
  } catch (e) {
    if (isEnvBrowser()) return true;
    else console.error('PlayerReady check failed', e);
  }
};

export const useCheckPlayerReady = (): CheckPlayerReady => {
  const [isPlayerReady, setPlayerReady] = useRecoilState(phoneState.playerReady);

  const updateReadyState = useCallback(async () => {
    const readyState = await fetchReadyStatus();
    setPlayerReady(readyState);
  }, [setPlayerReady]);

  useEffect(() => {
    updateReadyState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isPlayerReady, updateReadyState };
};
