class _AudioService {

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
    const context = this.context || new window.AudioContext();

    // Create oscillator and gain node:
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    // Disconnect existing oscillator if there is one.
    if (this.currentOscillator) this.currentOscillator.disconnect();

    // Set the type and frequency of the oscillator.
    oscillator.type = 'square';
    // oscillator.type = 'sawtooth';
    this.currentFrequency = oscillator.frequency.value = frequency;

    // Set volume of the oscillator.
    gainNode.gain.value = 0.025;

    // Route oscillator through gain node to speakers.
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(0);

    // Set the current oscillator to the one we've just created.
    return (this.currentOscillator = oscillator);
  }

  playFreq(frequency) {
    if (!this.enabled) return;

    if (this.resetOscillator) {
      this.createCurrentOscillator(frequency);
    } else if (this.currentFrequency !== frequency) {
      const currentOscillator = this.currentOscillator || this.createCurrentOscillator(frequency);

      this.currentFrequency = currentOscillator.frequency.value = frequency;
    }
  }

  resume() {
    if (!this.enabled) return;

    this.context.resume();
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;

    if (this.currentOscillator) this.currentOscillator.disconnect();
  }

}

export const AudioService = window.audioService = new _AudioService({ enabled: false, resetOscillator: false });
