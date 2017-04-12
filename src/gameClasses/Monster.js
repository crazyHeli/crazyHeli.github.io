import {Moving} from '../abstractClasses/Moving.js';
import {Animate} from '../supportingClasses/Animate.js';
import {enemyBullets} from '../FactoryClasses/enemyBullets.js';

class Monster extends Moving{
    constructor(speed, score){
        super();
        const options = {
            'img': window.imgs.monster,
            'pos': [720, this.randomInteger(30, 350)],
            'size': [55, 45],
            'innerSize': [55, 45],
            'speedFrames': 5,
            'frames': [0, 1, 2, 3, 4, 5, 6, 7],
        }
        this.animate = new Animate(options);
        this.alive = true;
        this.score = score;
        this.speed = speed;
        this.enemyBullets = new enemyBullets(this.score);
        this.time = Date.now();
    }

    move(){
        this.animate.pos[0] -= this.speed + this.score.score * 0.00008;
        this.animate.update();
        this.animate.render(this.context);
        if(this.animate.pos[0] <= -55){
            this.alive = false;
        }
    }

    fire(){
        if(this.time + 1600 < Date.now()){
            this.enemyBullets.init(this.animate.pos[0], this.animate.pos[1] + 25, 3.5);
            this.time = Date.now();
        }
    }

    clear(){
        this.alive = false;
    }
}

export {Monster};
