const synth1 = new Tone.PolySynth(Tone.MonoSynth, {
    oscillator: {
        type: "sawtooth"
    },
    envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.5,
        release: 1
    },
    filterEnvelope: {
        attack: 0.01,
        baseFrequency: 400,
        decay: 0.2,
        exponent: 2,
        octaves: 1,
        sustain: 0.5,
        release: 1,
    }
});
synth1.maxPolyphony = 32;

const synth2 = new Tone.PolySynth(Tone.MonoSynth, {
    oscillator: {
        type: "sawtooth"
    },
    envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.5,
        release: 1
    },
    filterEnvelope: {
        attack: 0.01,
        baseFrequency: 400,
        decay: 0.2,
        exponent: 2,
        octaves: 1,
        sustain: 0.5,
        release: 1,
    }
});
synth2.maxPolyphony = 32;

const synth3 = new Tone.PolySynth(Tone.MonoSynth, {
    oscillator: {
        type: "sawtooth"
    },
    envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.5,
        release: 1
    },
    filterEnvelope: {
        attack: 0.01,
        baseFrequency: 400,
        decay: 0.2,
        exponent: 2,
        octaves: 1,
        sustain: 0.5,
        release: 1,
    }
});
synth2.maxPolyphony = 32;


const pan1 = new Tone.Panner(0);
const pan2 = new Tone.Panner(-0.8);
const pan3 = new Tone.Panner(0.8);

const reverb = new Tone.Reverb({
    decay: 3,
    preDelay: 0.1,
    wet: 0.1,
})
const gain = new Tone.Gain(0.7);

synth1.chain(pan1, reverb, gain);
synth2.chain(pan2, reverb, gain);
synth3.chain(pan3, reverb, gain);
gain.toDestination();