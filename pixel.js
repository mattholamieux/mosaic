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
        this.modIndex = map(g, 255, 0, 4, 40);
        this.harmonicity = harmonics[floor(map(b, 0, 255, 0, harmonics.length))];
        this.susLength = 0.1;
        this.mouseIntersect = false;
        this.autoIntersect = false;
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
                    modulationIndex: this.modIndex,
                    harmonicity: this.harmonicity,
                    modulationEnvelope: {
                        attack: this.modAttack
                    }
                });
                synth1.triggerAttackRelease(this.note, this.susLength);
                this.mouseIntersect = true;
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
                    modulationIndex: this.modIndex,
                    harmonicity: this.harmonicity,
                    modulationEnvelope: {
                        attack: this.modAttack
                    }
                });
                synth2.triggerAttackRelease(this.note, this.susLength);
                this.autoIntersect = true;
            }
        } else {
            this.autoIntersect = false;
        }
    }
}