import {Animate} from '../supportingClasses/Animate.js';
import {Score} from '../supportingClasses/GameStates.js';
import {Moving} from '../abstractClasses/Moving.js';

/**
 * Class for clouds
 */
class Clouds extends Moving{
    constructor(pos, speed, scale, score){
        super();
        this.score = score;
        this.x = pos[0];
        this.y = this.startY = pos[1];
        this.speedX = speed[0];
        this.speedY = speed[1];
        this.options = {
            'img': imgs.boom,
            'pos': [this.x, this.y],
            'size': [125, 125],
            'innerSize': [125, 125],
            'speedFrames': 2,
            'frames': [0, 1, 2, 3, 4, 5, 6, 7],
            'scale': scale,
            'once': true
        }
        this.anim = new Animate(this.options);
        this.alive = true;
        this.booms = false;
        this.boomsEnd = false;
        this.collideWithHeli = false;
        this.safe = false;
    }

    move() {
        if(Math.round(this.y) === Math.round(this.startY + 30)){
            this.speedY = -this.speedY;
        }
        if(Math.round(this.y) === Math.round(this.startY - 30)){
            this.speedY = -this.speedY;
        }

       this.x -= (this.speedX + this.score.score * 0.00008); //for increasing speed on another level
        this.y += this.speedY;

        if(this.x < -150){
            this.alive = false;
        }

    }

    draw(img) {
        this.context.drawImage(img, this.x, this.y);
    }

    boom(){
        this.anim.pos[0] = this.x;
        this.anim.pos[1] = this.y;
        this.anim.update();
        this.anim.render(this.context);
        if(this.anim.done){
            this.alive = false;
        }
    }

}

export {Clouds};
