import { tokenService } from './tokenService';

export const resetService = () => {
  tokenService.updateLocalTokenData('', );
  window.location.replace('/');
};
