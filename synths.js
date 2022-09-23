const synth1 = new Tone.PolySynth(Tone.FMSynth, {
    modulationIndex: 1,
    harmonicity: 4,
    envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.9,
        release: 1
    },
    modulationEnvelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.9,
        release: 1
    }
});
synth1.maxPolyphony = 32;

const synth2 = new Tone.PolySynth(Tone.FMSynth, {
    modulationIndex: 1,
    harmonicity: 4,
    envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.9,
        release: 1
    },
    modulationEnvelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.9,
        release: 1
    }
});
synth2.maxPolyphony = 32;

const synth3 = new Tone.PolySynth(Tone.FMSynth, {
    modulationIndex: 1,
    harmonicity: 4,
    envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.9,
        release: 1
    },
    modulationEnvelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.9,
        release: 1
    }
});
synth2.maxPolyphony = 32;


const pan1 = new Tone.Panner(0);
const pan2 = new Tone.Panner(-0.8);
const pan3 = new Tone.Panner(0.8);

const reverb = new Tone.Reverb({
    decay: 3,
    preDelay: 0.25,
    wet: 0.2,
})
const gain = new Tone.Gain(0.7);

synth1.chain(pan1, reverb, gain);
synth2.chain(pan2, reverb, gain);
synth3.chain(pan3, reverb, gain);
gain.toDestination();