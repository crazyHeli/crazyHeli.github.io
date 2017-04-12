class AbstractToken{
    constructor(){
        this.speed = 2;
    }


    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    move(){}

    draw(){}

    clean(){}
}

export {AbstractToken};
