// Web Audio API Sound Synthesizer for Tactile Cyberpunk UI
class SoundManager {
    constructor() {
        this.ctx = null;
        this.isMuted = localStorage.getItem('sound_muted') === 'true';
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('sound_muted', this.isMuted.toString());
        if (!this.isMuted) {
            this.playBlip(600, 'sine', 0.05);
        }
        return this.isMuted;
    }

    playTone(frequency, type = 'sine', duration = 0.06, gainLevel = 0.04) {
        if (this.isMuted) return;
        try {
            this.init();
            if (!this.ctx || this.ctx.state === 'suspended') {
                this.ctx?.resume();
            }
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, this.ctx.currentTime + duration);

            gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            // Audio policy fallback
        }
    }

    playClick() {
        this.playTone(850, 'triangle', 0.04, 0.05);
    }

    playHover() {
        this.playTone(420, 'sine', 0.03, 0.02);
    }

    playTransition() {
        if (this.isMuted) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(240, now);
            osc.frequency.exponentialRampToValueAtTime(480, now + 0.15);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.18);
        } catch (e) {}
    }
}

export const sound = new SoundManager();
