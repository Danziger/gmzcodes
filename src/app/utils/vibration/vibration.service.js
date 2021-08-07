import { vibrate } from './vibration.utils';

class _VibrationService {

  static LS_VIBRATION_SERVICE_ENABLED = 'LS_VIBRATION_SERVICE_ENABLED';

  enabled = true;

  constructor({ enabled }) {
    this.enabled = enabled;
  }

  vibrate(pattern) {
    this.enabled && vibrate(pattern);
  }

  enable() {
    localStorage.setItem(_VibrationService.LS_VIBRATION_SERVICE_ENABLED, true);

    this.enabled = true;
  }

  disable() {
    localStorage.setItem(_VibrationService.LS_VIBRATION_SERVICE_ENABLED, false);

    this.enabled = false;

    vibrate(0);
  }

}

export const VibrationService = new _VibrationService({
  enabled: localStorage.getItem(_VibrationService.LS_VIBRATION_SERVICE_ENABLED) === 'true',
});
