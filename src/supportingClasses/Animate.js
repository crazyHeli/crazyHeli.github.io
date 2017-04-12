/**
 * It is ours abstract object for animation
 */
class Animate{
    constructor(options){
        this.img = options.img;
        this.innerPos = options.innerPos || [0, 0];
        this.pos = options.pos || [0, 0];
        this.size = options.size || [0, 0];
        this.innerSize = options.innerSize || [100, 100];
        this.speed = typeof options.speedFrames === 'number' ? options.speedFrames : 0;
        this.frames = options.frames || [0];//sequence of frames;
        this._index = 0;
        this.dir = options.dir || 'horizontal';
        this.scale = options.scale || 1;
        this.currentFrame = 0;        // the current frame to draw
        this.counter = 0;             // keep track of frame rate
        this.once = options.once || false;
        this.done = options.done || false;
    }

    update () {
        if(this.once && this.currentFrame >= this.frames.length - 2){
            this.done = true;
            return;
        }
        this.counter++;
        if (this.once && this.counter > this.speed) {
            this.counter = 0;

            if (this.currentFrame < this.frames.length) {
                this.currentFrame++;

            }

        }


        if (!this.once && this.counter > this.speed) {

            this.counter = 0;

            if (this.currentFrame < this.frames.length - 1) {
                this.currentFrame++;
            } else {

                this.currentFrame = 0;
            }
        }
    }

    render(ctx) {


        const sx = this.size[0] * this.scale;
        const sy = this.size[1] * this.scale;

        let animX = this.frames[this.currentFrame] * this.size[0];
        ctx.drawImage(this.img,
                      animX, this.innerPos[1],
                      this.innerSize[0], this.innerSize[1],
                      this.pos[0], this.pos[1],
                      sx, sy);
    }

}

export {Animate};
