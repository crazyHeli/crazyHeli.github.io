import {AbstractToken} from '../abstractClasses/AbstractToken.js';
import {Animate} from '../supportingClasses/Animate.js';


class gIg extends AbstractToken{
    constructor() {
        super();
        const options = {
            img: window.imgs.gIg,
            pos: [720, this.randomInteger(20, 250)],
            size: [30, 30],
            innerSize: [30, 30],
            speedFrames: 6,
            frames: [0, 1, 2, 3, 4, 5, 6, 7],
        }
        this.animate = new Animate(options);
        this.alive = true;
    }

    move(speed){
        this.animate.pos[0] -= speed;
        if(this.animate.pos[0] <= -50){
            this.alive = false;
        }
    }

    draw(){
        this.animate.update();
        this.animate.render(this.context);
    }
}

export { gIg };
