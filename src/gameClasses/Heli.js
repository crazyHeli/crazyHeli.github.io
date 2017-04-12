import { Moving } from '../abstractClasses/Moving.js';
import { Animate } from '../supportingClasses/Animate.js';
import { BulletPool } from '../FactoryClasses/BulletPool.js';
import { Score } from '../supportingClasses/GameStates.js';
import { Firer } from '../FactoryClasses/Firer.js';
import {Sound} from '../supportingClasses/Sound.js';


/**
 * Class for helicopter
 */

class Heli extends Moving {
    constructor(score) {
        super();
        this.sounds = window.sounds.shoot;
        this.speed = 6;
        this.gravity = 1.5;
        this.options = {
            'img': window.imgs.heli,
            'pos': [this.x, this.y],
            'size': [80, 70],
            'innerSize': [80, 70],
            'speedFrames': 5,
            'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        }
        this.animate = new Animate(this.options);
        this.bullets = new BulletPool();
        this.bullets.init();
        this.firer = new Firer(this.canvasHeight);
        this.counter = 0;
        this.fireRate = 40;
        this.fireSpeed = 3;
        this.flick = false;
        this.counterFlick = 0;
        this.flickState = 1;
        this.counterFlickTime = 0
        this.god = false;
        this.score = score;
        this.stars = false;
        this.tokenShield = false;
        this.canFire = false;
        this.canBullet = true;
    }

    draw() {
        const flickRate = 20;
        this.flickTime = this.tokenShield ? 400 : 150;
        const img = new Image();
        let animImg = window.imgs.heli;
        if(this.stars){
            this.animate.frames = [0, 1];
            animImg = window.imgs.heliStars;
        }
        if(this.flick){
            if(this.counterFlickTime < this.flickTime){
                this.god = true;
                this.counterFlickTime++;
                this.counterFlick++;
                if(this.counterFlick >= flickRate && this.flickState === 1){
                    this.animate.img = animImg;
                    this.counterFlick = 0;
                    this.flickState = 2;
                }
                if(this.counterFlick >= flickRate && this.flickState === 2){
                    this.animate.img = img;
                    this.counterFlick = 0;
                    this.flickState = 1;
                }
            }else{
                this.counterFlickTime = 0;
                this.flick = false;
                this.god = false;
                this.stars = false;
                this.tokenShield = false;
                this.animate.img = window.imgs.heli;
                this.animate.size[0] = 80;
                this.animate.innerSize[0] = 80;
                this.animate.frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            }
        }
        this.options.pos[0] = this.x;
        this.options.pos[1] = this.y;
        this.animate.update();
        this.animate.render(this.context);
    }

    move() {
        this.counter++;
        if (KEY_STATUS.up) {
            this.y -= this.speed - this.gravity;
        } else if (KEY_STATUS.down) {
            this.y += this.speed;

        } else {
            this.y += this.gravity;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > this.canvasHeight - window.imgs.heli.height){
            this.y = this.canvasHeight - window.imgs.heli.height;
        }
        if (KEY_STATUS.space && this.counter >= this.fireRate) {
			this.fire();
			this.counter = 0;
		}
        if(KEY_STATUS.ctrl && this.canFire){
            this.column();
            this.canFire = false;
            this.score.fireImg = window.imgs.fireIconTr;
        }
    }

    fire(){
        if(this.canBullet){
            this.bullets.init(this.x + 40, this.y + 45, this.fireSpeed + this.score.score * 0.00008);
            this.sounds.play();
        }
    }

    column(){
        this.firer.init();
        // this.firer.height = 0;
    }
}


let KEY_STATUS = {};
for (let code in KEY_CODES) {
    KEY_STATUS[KEY_CODES[code]] = false;
}

let KEY_CODES = {
    17: 'ctrl',
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
}

document.onkeydown = function(e) {

    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = true;
    }
}

document.onkeyup = function(e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = false;
    }
}
export { Heli };
