import { atom } from 'recoil';
import { ResourceConfig } from '../../../../../typings/config';
import { isEnvBrowser } from '../../../utils/misc';

export const phoneState = {
  visibility: atom<boolean>({
    key: 'phoneVisibility',
    default: false,
  }),
  resourceConfig: atom<ResourceConfig>({
    key: 'resourceConfig',
    default: null,
  }),
  phoneTime: atom<string>({
    key: 'phoneTime',
    default: null,
  }),
  playerReady: atom({
    key: 'playerReady',
    default: true,
  }),
};
