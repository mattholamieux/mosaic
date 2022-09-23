const synth1 = new Tone.PolySynth(Tone.FMSynth, {
    modulationIndex: 1,
    harmonicity: 8,
    envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.5,
        release: 1
    },
    modulationEnvelope: {
        attack: 0.2,
        decay: 0.5,
        sustain: 0.5,
        release: 1
    }
});
synth1.maxPolyphony = 48;

const synth2 = new Tone.PolySynth(Tone.FMSynth, {
    modulationIndex: 1,
    harmonicity: 4,
    envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.5,
        release: 1
    },
    modulationEnvelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.5,
        release: 1
    }
});
synth2.maxPolyphony = 48;


const pan1 = new Tone.Panner(-0.1);
const pan2 = new Tone.Panner(-0.1);

const reverb = new Tone.Reverb({
    decay: 3,
    preDelay: 0.1,
    wet: 0.1,
})
const gain = new Tone.Gain(0.5);

synth1.chain(pan1, reverb, gain);
synth2.chain(pan2, reverb, gain);
gain.toDestination();