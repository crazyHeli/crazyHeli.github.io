import { Moving } from '../abstractClasses/Moving.js';

class Ground extends Moving{
    constructor(score){
        super();
        this.gameState;
        this.groundImg = null;
        this.x = 0;
        this.y = 0;
        this.score = score;
    }

    chooseGround(){
        if(this.gameState.level === 2){
            this.groundImg = window.imgs.ground;
            this.y = this.canvasHeight - this.groundImg.height
        } else if(this.gameState.level === 3){
            this.groundImg = window.imgs.ground2;
            this.y = this.canvasHeight - this.groundImg.height
        }
    }

    draw(){
        // console.log(this.gameState.level);
        if(this.gameState.level >= 2){
            this.x += 1.5 + this.score.score * 0.00008;
            this.context.drawImage(this.groundImg, -this.x, this.y);
            this.context.drawImage(this.groundImg, -this.x + this.canvasWidth, this.y);
            if (this.x >= this.canvasWidth){
                this.x = 0;
            }
        }
    }
}
export {Ground};
