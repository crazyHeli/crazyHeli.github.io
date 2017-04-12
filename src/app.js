import { Game } from './Game.js';
import { imgsLoader } from './loaders/imgLoader.js';
import { soundLoader } from './loaders/soundLoader.js';
import {Mountains} from './FactoryClasses/Mountains.js';
import {Score} from './supportingClasses/GameStates.js';
import {Planes} from './gameClasses/Planes.js';
import {Sound} from './supportingClasses/Sound.js';



let menu = document.getElementById('menu');
let hide = function(el) {
    el.style.display = 'none';
    window.game.pause = false;
    init();
}

document.querySelectorAll('.play')[0].addEventListener('click', function() {
  hide(menu);

});


window.imgs = imgsLoader({
    'background': './imgs/background1.png',
    'background2': './imgs/background2.png',
    'background3': './imgs/background3.png',
    'ground': './imgs/ground.png',
    'ground2': './imgs/ground2.png',
    'coins': './imgs/coins.png',
    'boom': './imgs/boom.png',
    'cloudS': './imgs/cloudS.png',
    'cloudM': './imgs/cloudM.png',
    'cloudB': './imgs/cloudB.png',
    'heli': './imgs/aHeli.png',
    'heliStars': './imgs/heliStars.png',
    'rocket': './imgs/rocket.png',
    'score': './imgs/score.png',
    'gameOver': './imgs/gameover2.png',
    'health': './imgs/health.png',
    'shield': './imgs/shield.png',
    'power': './imgs/power.png',
    'gIg': './imgs/GiG.png',
    'fire': './imgs/fire.png',
    'fireIconTr': './imgs/fireIconTr.png',
    'fireIcon': './imgs/fireIcon.png',
    'gIgBG': './imgs/gIgBG.png',
    'planes': './imgs/planes.png',
    'monster': './imgs/monster.png',
    'enemyBullet': './imgs/enemyFire.png',
    'shieldIcTr': './imgs/shieldIcTr.png',
});

window.mountainImgs = imgsLoader({
     'part1': './imgs/mount1.png',
    'part2': './imgs/mount2.png',
    'part3': './imgs/mount3.png',
    'part4': './imgs/mount4.png',
    'part5': './imgs/mount5.png',
    'part6': './imgs/mount6.png',
    'part7': './imgs/mount7.png',
    'part8': './imgs/mount8.png',
    'part9': './imgs/mount9.png',
    'part10': './imgs/mount10.png',
    'part11': './imgs/mount11.png',
    'part12': './imgs/mount12.png',
    'part13': './imgs/mount13.png',
    'part14': './imgs/mount14.png',
    'part15': './imgs/mount15.png',
    'part16': './imgs/mount16.png',
    'part17': './imgs/mount17.png'
});



 window.sounds = soundLoader({
    'backgroundTrack': './sounds/backgroundTrack.mp3',
    'shoot': './sounds/shoot.wav',
    'gameover': './sounds/game-over.wav',
    'coins': './sounds/coins.wav',
    'explos': './sounds/explos.wav',
    'collis': './sounds/collis.flac'

 })


const game = new Game();
window.game = game;




function init() {

    if (game.init()){
        game.start(animate);
    }
}



window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

//Function for updating
const animate = function(ctx) {
    if(game.score.gIg){
        game.heli.canBullet = false;
        game.gIgtimer.tick();
        if(game.gIgtimer.check()){
            game.gIgcoins.destroy();
            game.collisions.gIgcoins = [];
            game.heli.y = 120;
            game.heli.flick = true;
            game.gIgtimer.clear();
            game.heli.canBullet = true;
            game.score.gIg = false;
        }
        game.gIganimate();
    }else{
        game.animate();
    }
    requestAnimFrame( animate );
}
