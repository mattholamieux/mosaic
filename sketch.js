// Automation Track One 
let t1Xs = [];
let t1Ys = [];
let t1autoX;
let t1autoY;
let t1index = 0;
let t1Play = false;
// Automation Track Two
let t2Xs = [];
let t2Ys = [];
let t2autoX;
let t2autoY;
let t2index = 0;
let t2Play = false;
// Global variables
let selectedTrack = 1;
let isInitialized = false;
let isLooping = true;
let myImage;
let pixelSize = 40;
let pixelOffset = pixelSize / 2;
let pixelData = [];
let pixelObjects = [];
const notes = ['C2', 'D2', 'E2', 'G2', 'A2', 'C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4'];
const harmonics = [2, 4, 6, 8, 12, 16, 24, 32];
const oscillators = ["square", "sawtooth", "triangle"];
let reverbAmt = 0.1;

function preload() {
    myImage = loadImage("https://picsum.photos/1600");
}

function setup() {
    const cnvSize = Math.floor(windowHeight / 40) * 40;
    console.log(cnvSize);
    cnv = createCanvas(cnvSize, cnvSize);
    cnv.mousePressed(startRecording);
    cnv.mouseReleased(stopRecording);
    cnv.mouseWheel(trackPad);
    pixelDensity(1);
    image(myImage, 0, 0, width, height);
    getPixelData();
    rectMode(CENTER);
    stroke(180);
    // Draw instructions
    background(200, 150);
    let f = 0;
    textSize(37);
    textLeading(37);
    textFont("serif");
    for (i = 0; i < instructions.length; i++) {
        fill(f);
        text(instructions[i], 20, 37 * [i] + 37);
        f += 15;
    }
}

function draw() {
    for (const pixel of pixelObjects) {
        // pixel.show();
        pixel.mouseCross();
        pixel.autoCross();
        pixel.autoCross2();
    }

    if (mouseIsPressed) {
        if (selectedTrack === 1) {
            t1Xs.push(mouseX);
            t1Ys.push(mouseY);
        } else if (selectedTrack === 2) {
            t2Xs.push(mouseX);
            t2Ys.push(mouseY);
        }
    }
    if (t1Play) {
        t1autoX = t1Xs[t1index];
        t1autoY = t1Ys[t1index];
        if (t1index < t1Xs.length - 1) {
            t1index++;
        } else {
            t1index = 0;
        }
    }
    if (t2Play) {
        t2autoX = t2Xs[t2index];
        t2autoY = t2Ys[t2index];
        if (t2index < t2Xs.length - 1) {
            t2index++;
        } else {
            t2index = 0;
        }
    }
}

function getPixelData() {
    for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
            let pixelVals = get(x, y);
            pixelData.push(pixelVals);
        }
    }
}

function pixelate() {
    let y = 0;
    for (let i = 0; i < pixelData.length; i++) {
        let rgba = pixelData[i];
        let [r, g, b, a] = [rgba[0], rgba[1], rgba[2], rgba[3]];
        let x = (i * pixelSize) % width;
        let pixel = new Pixel(x, y, pixelSize, r, g, b, a);
        pixelObjects.push(pixel);
        if (x === width - pixelSize) {
            y += pixelSize;
        }
    }
}

function keyPressed() {
    if (key === " ") {
        if (!isInitialized) {
            initialize();
        } else if (isLooping) {
            noLoop();
            isLooping = false;
        } else {
            loop();
            isLooping = true;
        }
    }
    if (keyCode === RIGHT_ARROW) {
        location.reload();
    }
}

async function initialize() {
    await Tone.start();
    console.log("audio context started");
    pixelate();
    for (const pixel of pixelObjects) {
        pixel.show();
    }
    isInitialized = true;
    selectedTrack = 1;
}

function startRecording() {
    if (selectedTrack === 1) {
        t1Play = false;
        t1index = 0;
        console.log('recording track one');
        t1Xs = [];
        t1Yss = [];
    } else if (selectedTrack === 2) {
        t2Play = false;
        t2index = 0;
        console.log('recording track two');
        t2Xs = [];
        t2Yss = [];
    }
}

function stopRecording() {
    if (selectedTrack === 1) {
        console.log('stop recording track one')
        t1Play = true;
        selectedTrack = 2;
    } else if (selectedTrack === 2) {
        console.log('stop recording track two')
        t2Play = true;
        selectedTrack = 0;
    }
}

function trackPad(event) {
    // if mousewheel or trackpad scrolls down, reduce the reverb amount
    if (event.wheelDeltaY > 10) {
        if (reverbAmt > 0.02) {
            reverbAmt -= 0.01;
        }
        // if mousewheel or trackpad scrolls up, increase the reverb amount
    } else if (event.wheelDeltaY < -10) {
        if (reverbAmt < 0.9) {
            reverbAmt += 0.01;
        }
    }
    reverb.wet.value = reverbAmt;
    console.log(reverbAmt);
}