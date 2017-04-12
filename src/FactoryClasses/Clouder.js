import {Clouds} from '../gameClasses/Clouds.js';
import {Coins} from '../gameClasses/Coins.js';
import {Score} from '../supportingClasses/GameStates.js';

class Clouder{
    constructor(score){
    	this.clouds = [];
        this.time = Date.now();
        this.i = 0;
        this.booms = null;
        this.score = score;
    }

    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }


    initClouds() {
        let img;
        let scale;
        let type;
        if(this.i % 3 === 0){
            img = window.imgs.cloudS;
            scale = 0.6;
            type = 'small';
        }
        if(this.i % 3 === 1){
            img = window.imgs.cloudM;
            scale = 0.8;
            type = 'medium';
        }
        if(this.i % 3 === 2){
            img = window.imgs.cloudB;
            scale = 1.1;
            type = 'big';
        }
        let y = this.randomInteger(30, 200);
        let s1 = this.randomFloat(2, 3);
        let s2 = this.randomFloat(0.3, 0.6);
        let cloud = new Clouds([720, y], [s1, s2], scale, this.score);
        this.clouds.push({'cloud': cloud,
                        'img': img,
                        'type': type});
	}

    animateClouds() {
		for (let i = 0; i < this.clouds.length; i++) {
			// Only draw until we find a cloud that is not alive
            if (this.clouds[i].cloud.alive) {
                this.clouds[i].cloud.move();
                if(!this.clouds[i].cloud.booms){
                    this.clouds[i].cloud.draw(this.clouds[i].img);
                }else{
                    this.clouds[i].cloud.boom();
                }
            }
        }
	}

    clear(){
        this.clouds = [];
    }

    cleaner(){
        for (let i = 0; i < this.clouds.length; i++){
            if(this.clouds[i].cloud.alive === false){
                this.clouds.splice(i, 1);
            }
        }
    }
}
export {Clouder};
