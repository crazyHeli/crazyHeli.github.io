import { AbstractToken } from '../abstractClasses/AbstractToken.js';
import { Animate } from '../supportingClasses/Animate.js';


class Planes extends AbstractToken {

    constructor(score) {
        super();
        this.img = window.imgs.planes;
        this.lowerY = this.canvasHeight - 250;
        this.upperY = 10;
        this.x = this.canvasWidth;
        this.y = this.randomInteger(this.upperY, this.lowerY);
        this.speedY = this.randomInteger(-3, 3);
        this.score = score;
        this.generateNextArrivalTime();
        this.speed = 2.5;
        this.booms = false;
    }

    move() {
        if (!this.shouldArrive()) {
            return;
        }
        this.x -= (this.speed + this.score.score * 0.00006);
        this.y += this.speedY;
        if (this.y < this.upperY) {
            this.y = this.upperY;
            this.speedY = -this.speedY;
        }
        if (this.y > this.lowerY) {
            this.y = this.lowerY;
            this.speedY = -this.speedY;
        }
        if (this.x + this.img.width <= 0 || this.booms) {
            this.generateNextArrivalTime();
            this.x = this.canvasWidth;
            this.speedY = this.randomInteger(-2, 2);
            this.y = this.randomInteger(this.upperY, this.lowerY);
            this.booms = false;
        }
    }

    draw() {
        if (!this.shouldArrive()) {
            return;
        }
        this.context.drawImage(this.img, this.x, this.y);
    }

    shouldArrive() {
        var currentDate = new Date();
        if (currentDate >= this.arrivalTime) {
            return true;
        }
        return false;
    }

    generateNextArrivalTime() {
        var currentDate = new Date();
        currentDate.setSeconds(currentDate.getSeconds() + this.randomInteger(3, 6));
        this.arrivalTime = currentDate;
    }
}



export { Planes };
