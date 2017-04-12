import {enemyBullet} from '../gameClasses/enemyBullet.js';

class enemyBullets{
    constructor(score){
        this.eBullets = [];
        this.score = score;
    }


    /*
	 * Populates the pool array with Bullet objects
	 */
    init(x, y, speed) {
		// Initalize the bullet object
        const bullet = new enemyBullet(this.score);
        bullet.spawn(x, y, speed);
		this.eBullets.push(bullet);

	};



	/*
	 * Draws any in use Bullets. If a bullet goes off the screen,
	 * clears it and pushes it to the front of the array.
	 */
	animate() {
		for (let i = 0; i < this.eBullets.length; i++) {
            if (this.eBullets[i] && this.eBullets[i].alive){
                this.eBullets[i].draw();

            }
			else{
                continue;
            }
		}
	}

    cleaner(){
        for (let i = 0; i < this.eBullets.length; i++){
            if(this.eBullets[i].alive === false){
                this.eBullets.splice(i, 1);
            }
        }
    }
}

export {enemyBullets};
