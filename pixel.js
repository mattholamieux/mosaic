class Pixel {
    constructor(x, y, size, r, g, b, a) {
        this.x = x + pixelOffset;
        this.y = y + pixelOffset;
        this.size = size;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.note = notes[floor(map(r, 0, 255, 0, notes.length - 1))];
        this.filterAmt = floor(map(g, 0, 255, 1, 6));
        this.filterEnv = map(b, 0, 255, 0.01, 0.5);
        this.susLength = 0.1;
        this.mouseIntersect = false;
        this.autoIntersect = false;
        this.autoIntersect2 = false;
        this.grow = 1;
        this.growSize = size;
    }

    calculateNote() {
        this.note = notes[floor(map(this.r, 0, 255, 0, notes.length - 1))];
    }

    show() {
        fill(this.r, this.g, this.b, this.a);
        square(this.x, this.y, this.growSize);
    }

    mouseCross() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.size / 2) {
            if (!this.mouseIntersect) {
                this.growSize += pixelSize * this.grow;
                if (this.growSize === pixelSize * 5 || this.growSize === pixelSize) {
                    this.grow = this.grow * -1;
                }
                this.susLength = map(this.growSize, pixelSize, pixelSize * 5, 0.1, 0.7);
                synth1.set({
                    filterEnvelope: {
                        octaves: this.filterAmt,
                        attack: this.filterEnv
                    }
                });
                synth1.triggerAttackRelease(this.note, this.susLength);
                this.mouseIntersect = true;
                console.log(this.filterEnv)
            }
        } else {
            this.mouseIntersect = false;
        }
    }

    autoCross() {
        let d1 = dist(t1autoX, t1autoY, this.x, this.y);
        if (d1 < this.size / 2) {
            if (!this.autoIntersect) {
                this.growSize += pixelSize * this.grow;
                if (this.growSize === pixelSize * 5 || this.growSize === pixelSize) {
                    this.grow = this.grow * -1;
                }
                this.susLength = map(this.growSize, pixelSize, pixelSize * 5, 0.1, 0.7);
                synth2.set({
                    filterEnvelope: {
                        octaves: this.filterAmt,
                        attack: this.filterEnv
                    }
                });
                synth2.triggerAttackRelease(this.note, this.susLength);
                this.autoIntersect = true;
            }
        } else {
            this.autoIntersect = false;
        }
    }
    autoCross2() {
        let d2 = dist(t2autoX, t2autoY, this.x, this.y);
        if (d2 < this.size / 2) {
            if (!this.autoIntersect2) {
                this.growSize += pixelSize * this.grow;
                if (this.growSize === pixelSize * 5 || this.growSize === pixelSize) {
                    this.grow = this.grow * -1;
                }
                this.susLength = map(this.growSize, pixelSize, pixelSize * 5, 0.1, 0.7);
                synth3.set({
                    filterEnvelope: {
                        octaves: this.filterAmt,
                        attack: this.filterEnv
                    }
                });
                synth3.triggerAttackRelease(this.note, this.susLength);
                this.autoIntersect2 = true;
            }
        } else {
            this.autoIntersect2 = false;
        }
    }

}