import { vibrate } from './vibration.utils';

class _VibrationService {

  isEnabled = true;

  vibrate(pattern) {
    this.isEnabled && vibrate(pattern);
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;

    vibrate(0);
  }

}

export const VibrationService = new _VibrationService();
