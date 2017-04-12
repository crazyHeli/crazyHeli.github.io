/**
 * It is ours abstract object, from which will inherit all moving objects
 */
class Moving{
    constructor(){
        this.speed = 0;
    }

    // Initializing object
    init(x, y){
        // Default variables
        this.x = x;
        this.y = y;
    }

    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    // It is abstract function, that draw ours moving (what a pity, js does not support interfaces)
    draw(){}
}

export {Moving};
