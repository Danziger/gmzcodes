class _AudioService {

  static LS_AUDIO_SERVICE_ENABLED = 'LS_AUDIO_SERVICE_ENABLED';

  context = null;
  currentOscillator = null;

  currentFrequency = null;
  enabled = false;
  resetOscillator = false;

  constructor({ enabled, resetOscillator }) {
    this.enabled = enabled;
    this.resetOscillator = resetOscillator;
  }

  createCurrentOscillator(frequency = 100) {
    const context = this.context = this.context || new window.AudioContext();

    // Disconnect existing oscillator if there is one.
    if (this.currentOscillator) this.currentOscillator.disconnect();

    // Create oscillator and gain node:
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    // Set the type and frequency of the oscillator (square, sawtooth, sine, triangle).
    oscillator.type = 'triangle';
    this.currentFrequency = oscillator.frequency.value = frequency;

    // Set volume of the oscillator.
    gainNode.gain.value = 0.025 * 3;

    // Route oscillator through gain node to speakers.
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(0);

    // Set the current oscillator to the one we've just created.
    return (this.currentOscillator = oscillator);
  }

  playFreq(frequency) {
    if (!this.enabled) return;

    if (this.resetOscillator || !this.currentOscillator) {
      this.createCurrentOscillator(frequency);
    } else if (this.currentFrequency !== frequency) {
      this.currentFrequency = this.currentOscillator.frequency.value = frequency;
    }
  }

  resume() {
    if (!this.enabled) return;

    this.context.resume();
  }

  stop() {
    if (this.currentOscillator) this.currentOscillator.disconnect();
  }

  enable() {
    localStorage.setItem(_AudioService.LS_AUDIO_SERVICE_ENABLED, true);

    this.enabled = true;
  }

  disable() {
    localStorage.setItem(_AudioService.LS_AUDIO_SERVICE_ENABLED, false);

    this.enabled = false;

    if (this.currentOscillator) this.currentOscillator.disconnect();
  }

}

export const AudioService = window.audioService = new _AudioService({
  enabled: localStorage.getItem(_AudioService.LS_AUDIO_SERVICE_ENABLED) === 'true',
  resetOscillator: true,
});
