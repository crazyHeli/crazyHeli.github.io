import {Bullet} from '../gameClasses/Bullet.js';

/**
 * Custom Pool object. Holds Bullet objects to be managed to prevent
 * garbage collection.
 */
class BulletPool{
    constructor(){
        this.pool = [];
    }


    /*
	 * Populates the pool array with Bullet objects
	 */
    init(x, y, speed) {
		// Initalize the bullet object
        const bullet = new Bullet();
        bullet.spawn(x, y, speed);
		this.pool.push(bullet);
	};



	/*
	 * Draws any in use Bullets. If a bullet goes off the screen,
	 * clears it and pushes it to the front of the array.
	 */
	animate() {
		for (let i = 0; i < this.pool.length; i++) {
            if (this.pool[i] && this.pool[i].alive){
                this.pool[i].draw();
            }
			else{
                continue;
            }
		}
	}

    cleaner(){
        for (let i = 0; i < this.pool.length; i++){
            if(this.pool[i].alive === false){
                this.pool.splice(i, 1);
            }
        }
    }
}

export {BulletPool};
