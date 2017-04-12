import {Fire} from '../gameClasses/Fire.js';

class Firer{
    constructor(height){
        this.fires = [];
        this.canvasHeight = height;
        this.height = 0;
    }


    /*
	 * Populates the pool array with Bullet objects
	 */
    init() {
        while(this.height <= 300){
            let fire = new Fire();
            fire.animate.pos[1] = this.height;
            this.fires.push(fire);
            this.height += fire.options.img.height;
        }
	}



	/*
	 * Draws any in use Bullets. If a bullet goes off the screen,
	 * clears it and pushes it to the front of the array.
	 */
	animate() {
		for (let i = 0; i < this.fires.length; i++) {
            this.fires[i].draw();
		}
	}

    cleaner(){
        for (let i = 0; i < this.fires.length; i++){
            if(!this.fires[i].alive){
                this.fires.splice(i, 1);
                this.height = 0;
            }
        }
    }
}

export {Firer};
