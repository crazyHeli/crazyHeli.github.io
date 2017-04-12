import { Score } from './GameStates.js';

class Sound {

constructor(){
    this.sounds = window.sounds.backgroundTrack;
    this.volume = .5;
}

load(){
    this.sounds.load();
}

play(){
    this.sounds.play();
}

pause(){
        this.sounds.pause(); 
}



}

export { Sound };
