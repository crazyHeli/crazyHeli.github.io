import { Moving } from '../abstractClasses/Moving.js';

/**
 * Class for clouds
 */

class Background extends Moving{
     constructor(){
         super();
         this.speed = 0.8;
         this.img = window.imgs.background;
         this.score;
     }

     draw() {
        this.x += this.speed;
         this.context.drawImage(this.img, -this.x, this.y);
         this.context.drawImage(this.img, -this.x + this.canvasWidth, this.y);
         if (this.x >= this.canvasWidth)
             this.x = -1;
    }

    drawgIg(){
        this.x += 4;
        this.context.drawImage(window.imgs.gIgBG, -this.x, this.y);
        this.context.drawImage(window.imgs.gIgBG, -this.x + this.canvasWidth, this.y);
        if (this.x >= this.canvasWidth){
            this.x = 0;
        }
    }

    checkImg(){
        if(this.score.level === 2){
            this.img = window.imgs.background2;
        }
        if(this.score.level === 3){
            this.img = window.imgs.background3;
        }
    }

 }

export {Background};
