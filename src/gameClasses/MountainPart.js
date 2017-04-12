import {Moving} from '../abstractClasses/Moving.js';


/**
 * Class for a moountain part
 */
class MountainPart extends Moving{
    constructor(prevMountain, img, speed,score){
        super();
        this.img = img;
        this.speed = speed;
        this.prevMountain = prevMountain;
        this.locationInitialized = false;
        this.score = score;
        if (prevMountain){
            this.firstMountain = false;
        }
        else {
            this.firstMountain = true;
        }
    }

    move() {
          if (this.img.width == 0 || this.img.height == 0){
            //img is not loaded yet
            return;
        }
        if (!this.locationInitialized){
            this.locationInitialized = true;
            this.width = this.img.width;
            this.height = this.img.height;
            //init x
            if (this.firstMountain){
                this.x = 0;
            } else {
                this.x = this.prevMountain.x + this.prevMountain.width ;
            }
            //init y
            this.y = 480 - this.height;
        }

        this.x -= this.speed;
        if ((this.x + this.width) <= 0){
            this.x = this.prevMountain.x + this.prevMountain.width -1 ;
        }
    }

    draw() {
        this.context.drawImage(this.img, this.x, this.y);
    }

    clear(){
        this.context.clearRect(this.x, this.y, this.width, this.height)
    }
}

export {MountainPart};
