import { Animate } from '../supportingClasses/Animate.js';
import { MountainPart } from '../gameClasses/MountainPart.js';



class Mountains {
    constructor(score) {
        this.mountArray = [];
        this.speed = 1.5;
        this.score = score;
    }

    init() {
        let prevMountain = null;
        for(let img in window.mountainImgs) {
            let mountain = new MountainPart(prevMountain, window.mountainImgs[img], this.speed + this.score.score * 0.00008, this.score);
            this.mountArray.push(mountain);
            prevMountain = mountain;
        }
        this.mountArray[0].prevMountain = this.mountArray[this.mountArray.length-1];
    }

    move() {
        for (let i = 0; i < this.mountArray.length; i++){
            let mountain = this.mountArray[i];
            mountain.move();
        }
    }

    draw() {
        for (let i = 0; i < this.mountArray.length; i++){
            let mountain = this.mountArray[i];
            mountain.draw();
        }
    }

    clear(){
        this.mountArray = [];
    }
}
export { Mountains };
