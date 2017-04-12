/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * It is ours abstract object for animation
 */
var Animate = function () {
    function Animate(options) {
        _classCallCheck(this, Animate);

        this.img = options.img;
        this.innerPos = options.innerPos || [0, 0];
        this.pos = options.pos || [0, 0];
        this.size = options.size || [0, 0];
        this.innerSize = options.innerSize || [100, 100];
        this.speed = typeof options.speedFrames === 'number' ? options.speedFrames : 0;
        this.frames = options.frames || [0]; //sequence of frames;
        this._index = 0;
        this.dir = options.dir || 'horizontal';
        this.scale = options.scale || 1;
        this.currentFrame = 0; // the current frame to draw
        this.counter = 0; // keep track of frame rate
        this.once = options.once || false;
        this.done = options.done || false;
    }

    _createClass(Animate, [{
        key: 'update',
        value: function update() {
            if (this.once && this.currentFrame >= this.frames.length - 2) {
                this.done = true;
                return;
            }
            this.counter++;
            if (this.once && this.counter > this.speed) {
                this.counter = 0;

                if (this.currentFrame < this.frames.length) {
                    this.currentFrame++;
                }
            }

            if (!this.once && this.counter > this.speed) {

                this.counter = 0;

                if (this.currentFrame < this.frames.length - 1) {
                    this.currentFrame++;
                } else {

                    this.currentFrame = 0;
                }
            }
        }
    }, {
        key: 'render',
        value: function render(ctx) {

            var sx = this.size[0] * this.scale;
            var sy = this.size[1] * this.scale;

            var animX = this.frames[this.currentFrame] * this.size[0];
            ctx.drawImage(this.img, animX, this.innerPos[1], this.innerSize[0], this.innerSize[1], this.pos[0], this.pos[1], sx, sy);
        }
    }]);

    return Animate;
}();

exports.Animate = Animate;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * It is ours abstract object, from which will inherit all moving objects
 */
var Moving = function () {
    function Moving() {
        _classCallCheck(this, Moving);

        this.speed = 0;
    }

    // Initializing object


    _createClass(Moving, [{
        key: "init",
        value: function init(x, y) {
            // Default variables
            this.x = x;
            this.y = y;
        }
    }, {
        key: "randomInteger",
        value: function randomInteger(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
    }, {
        key: "randomFloat",
        value: function randomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }

        // It is abstract function, that draw ours moving (what a pity, js does not support interfaces)

    }, {
        key: "draw",
        value: function draw() {}
    }]);

    return Moving;
}();

exports.Moving = Moving;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Score = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collisions = __webpack_require__(13);

var _Clouder = __webpack_require__(9);

var _Clouds = __webpack_require__(8);

var _Coins = __webpack_require__(5);

var _Coiner = __webpack_require__(10);

var _Moving2 = __webpack_require__(1);

var _Mountains = __webpack_require__(6);

var _Animate = __webpack_require__(0);

var _Planes = __webpack_require__(7);

var _Sound = __webpack_require__(4);

var _Monsters = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Score = function (_Moving) {
    _inherits(Score, _Moving);

    function Score(game, heli) {
        _classCallCheck(this, Score);

        var _this = _possibleConstructorReturn(this, (Score.__proto__ || Object.getPrototypeOf(Score)).call(this));

        _this.score = 0;
        _this.img = window.imgs.score;
        _this.img2 = window.imgs.gameOver;
        _this.fireImg = window.imgs.fireIconTr;
        _this.shieldImg = window.imgs.shieldIcTr;
        _this.level = 1;
        _this.lives = 3;
        _this.count = 0;
        _this.sounds = window.sounds.backgroundTrack;
        _this.sounds2 = window.sounds.shoot;
        _this.sounds3 = window.sounds.gameover;
        _this.sounds4 = window.sounds.coins;
        _this.sounds5 = window.sounds.explos;
        _this.sounds6 = window.sounds.collis;
        _this.gIg = false;
        _this.gIgCounter = 0;
        _this.gameObj = game;
        _this.heli = heli;
        return _this;
    }

    _createClass(Score, [{
        key: 'draw',
        value: function draw() {
            this.context.drawImage(this.img, this.x, this.y);
            this.context.font = "30px Segoe UI, Arial";
            this.context.fillStyle = "white";
            this.context.fillText(this.score.toString(), this.x + this.img.width + 7, this.y + 40);
            this.context.fillText("LEVEL " + this.level.toString(), 310, 40);
            if (this.fireImg) {
                this.context.drawImage(this.fireImg, 20, 15);
            }
            if (this.heli.god) {
                this.shieldImg = window.imgs.shield;
            } else {
                this.shieldImg = window.imgs.shieldIcTr;
            }
            if (this.shieldImg) {
                this.context.drawImage(this.shieldImg, 40, 60);
            }
        }
    }, {
        key: 'drawWithoutLevel',
        value: function drawWithoutLevel() {
            this.context.drawImage(this.img, this.x, this.y);
            this.context.font = "30px Segoe UI, Arial";
            this.context.fillStyle = "white";
            this.context.fillText(this.score.toString(), this.x + this.img.width + 7, this.y + 40);
        }
    }, {
        key: 'draw2',
        value: function draw2() {
            this.context.fillText("LIVES " + this.lives.toString(), 110, 40);
            this.context.font = "50px Segoe UI, Arial";
        }
    }, {
        key: 'onHeliWithCloud',
        value: function onHeliWithCloud() {
            if (this.score >= 50) {
                this.score -= 50;
            } else this.score = 0;
            if (this.lives >= 2) {
                this.lives -= 1;
            } else this.gameOver();
            this.checkScores();

            this.sounds6.play();
        }
    }, {
        key: 'onHeliWithCoins',
        value: function onHeliWithCoins() {
            this.score += 25;
            this.checkScores();
            this.sounds4.play();
        }
    }, {
        key: 'onBulletWithCloud',
        value: function onBulletWithCloud() {
            this.score += 70;
            this.checkScores();
            this.sounds5.play();
        }
    }, {
        key: 'onheliWithMountain',
        value: function onheliWithMountain() {
            this.sounds6.play();
            if (this.lives >= 2) {
                this.lives -= 1;
            } else this.gameOver();
        }
    }, {
        key: 'onHeliWithPlane',
        value: function onHeliWithPlane() {
            this.sounds6.play();
            if (this.score >= 50) {
                this.score -= 50;
            } else this.score = 0;
            if (this.lives >= 2) {
                this.lives -= 1;
            } else this.gameOver();
            this.checkScores();
        }
    }, {
        key: 'onHeliWithGround',
        value: function onHeliWithGround() {
            if (this.lives >= 2) {
                this.lives -= 1;
            } else this.gameOver();
        }
    }, {
        key: 'onBulletWithPlane',
        value: function onBulletWithPlane() {
            if (this.score >= 50) {
                this.score -= 50;
                this.sounds5.play();
            } else this.score = 0;
            this.checkScores();
        }
    }, {
        key: 'onScoreEnemy',
        value: function onScoreEnemy() {
            this.score += 70;
            this.checkScores();
            this.sounds5.play();
        }
    }, {
        key: 'onHeliWithEnemy',
        value: function onHeliWithEnemy() {
            this.sounds6.play();
            if (this.score >= 50) {
                this.score -= 50;
            } else this.score = 0;
            if (this.lives >= 2) {
                this.lives -= 1;
            } else this.gameOver();
            this.checkScores();
        }
    }, {
        key: 'gameOver',
        value: function gameOver() {
            this.gameObj.pause = true;
            this.sounds.pause();
            this.sounds3.play();
            this.context.drawImage(this.img2, 0, 0);
            this.gameObj.destroy();
            this.showRestart();
        }
    }, {
        key: 'showRestart',
        value: function showRestart() {
            var menu = document.getElementById('menu');
            menu.className = "restart";
            menu.style.display = 'block';
        }
    }, {
        key: 'show',
        value: function show(elem) {
            el.style.display = 'block';
            this.init();
        }
    }, {
        key: 'checkScores',
        value: function checkScores() {
            if (this.score >= 0 && this.score <= 7500) {
                if (this.beenTwo) {
                    return;
                }
                this.level = 1;
            } else if (this.score > 7500 && this.score <= 15000) {
                if (!this.beenTwo) {
                    this.gameObj.planes = new _Planes.Planes(this);
                    this.gameObj.collisions.planes.push(this.gameObj.planes);
                    this.gameObj.mountains.clear();
                    this.gameObj.collisions.mountains = [];
                    this.gameObj.collisions.ground = this.gameObj.ground;
                }
                if (this.beenThree) {
                    return;
                }
                this.level = 2;
                this.beenTwo = true;
            } else if (this.score > 15000) {
                if (!this.beenThree) {}
                this.level = 3;
                this.beenThree = true;
            }
        }
    }]);

    return Score;
}(_Moving2.Moving);

exports.Score = Score;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractToken = function () {
    function AbstractToken() {
        _classCallCheck(this, AbstractToken);

        this.speed = 2;
    }

    _createClass(AbstractToken, [{
        key: "randomInteger",
        value: function randomInteger(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
    }, {
        key: "randomFloat",
        value: function randomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }
    }, {
        key: "move",
        value: function move() {}
    }, {
        key: "draw",
        value: function draw() {}
    }, {
        key: "clean",
        value: function clean() {}
    }]);

    return AbstractToken;
}();

exports.AbstractToken = AbstractToken;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Sound = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameStates = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sound = function () {
    function Sound() {
        _classCallCheck(this, Sound);

        this.sounds = window.sounds.backgroundTrack;
        this.volume = .5;
    }

    _createClass(Sound, [{
        key: 'load',
        value: function load() {
            this.sounds.load();
        }
    }, {
        key: 'play',
        value: function play() {
            this.sounds.play();
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.sounds.pause();
        }
    }]);

    return Sound;
}();

exports.Sound = Sound;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Coins = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Moving2 = __webpack_require__(1);

var _Animate = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class for helicopter
 */
var Coins = function (_Moving) {
    _inherits(Coins, _Moving);

    function Coins(options) {
        _classCallCheck(this, Coins);

        var _this = _possibleConstructorReturn(this, (Coins.__proto__ || Object.getPrototypeOf(Coins)).call(this));

        _this.options = {
            'img': imgs.coins,
            'pos': [options.pos[0], options.pos[1]],
            'size': [options.size[0], options.size[1]],
            'innerSize': [options.innerSize[0], options.innerSize[1]],
            'speedFrames': options.speedFrames,
            'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            'scale': options.scale
        };
        _this.coin = new _Animate.Animate(_this.options);
        _this.alive = true;
        return _this;
    }

    _createClass(Coins, [{
        key: 'moving',
        value: function moving(x) {
            this.coin.pos[0] -= x;
            this.coin.update();
            this.coin.render(this.context);
            if (this.coin.pos[0] <= -50) {
                this.alive = false;
            }
        }
    }]);

    return Coins;
}(_Moving2.Moving);

exports.Coins = Coins;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Mountains = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Animate = __webpack_require__(0);

var _MountainPart = __webpack_require__(12);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mountains = function () {
    function Mountains(score) {
        _classCallCheck(this, Mountains);

        this.mountArray = [];
        this.speed = 1.5;
        this.score = score;
    }

    _createClass(Mountains, [{
        key: 'init',
        value: function init() {
            var prevMountain = null;
            for (var img in window.mountainImgs) {
                var mountain = new _MountainPart.MountainPart(prevMountain, window.mountainImgs[img], this.speed + this.score.score * 0.00008, this.score);
                this.mountArray.push(mountain);
                prevMountain = mountain;
            }
            this.mountArray[0].prevMountain = this.mountArray[this.mountArray.length - 1];
        }
    }, {
        key: 'move',
        value: function move() {
            for (var i = 0; i < this.mountArray.length; i++) {
                var mountain = this.mountArray[i];
                mountain.move();
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            for (var i = 0; i < this.mountArray.length; i++) {
                var mountain = this.mountArray[i];
                mountain.draw();
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.mountArray = [];
        }
    }]);

    return Mountains;
}();

exports.Mountains = Mountains;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Planes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractToken2 = __webpack_require__(3);

var _Animate = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Planes = function (_AbstractToken) {
    _inherits(Planes, _AbstractToken);

    function Planes(score) {
        _classCallCheck(this, Planes);

        var _this = _possibleConstructorReturn(this, (Planes.__proto__ || Object.getPrototypeOf(Planes)).call(this));

        _this.img = window.imgs.planes;
        _this.lowerY = _this.canvasHeight - 250;
        _this.upperY = 10;
        _this.x = _this.canvasWidth;
        _this.y = _this.randomInteger(_this.upperY, _this.lowerY);
        _this.speedY = _this.randomInteger(-3, 3);
        _this.score = score;
        _this.generateNextArrivalTime();
        _this.speed = 2.5;
        _this.booms = false;
        return _this;
    }

    _createClass(Planes, [{
        key: 'move',
        value: function move() {
            if (!this.shouldArrive()) {
                return;
            }
            this.x -= this.speed + this.score.score * 0.00006;
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
    }, {
        key: 'draw',
        value: function draw() {
            if (!this.shouldArrive()) {
                return;
            }
            this.context.drawImage(this.img, this.x, this.y);
        }
    }, {
        key: 'shouldArrive',
        value: function shouldArrive() {
            var currentDate = new Date();
            if (currentDate >= this.arrivalTime) {
                return true;
            }
            return false;
        }
    }, {
        key: 'generateNextArrivalTime',
        value: function generateNextArrivalTime() {
            var currentDate = new Date();
            currentDate.setSeconds(currentDate.getSeconds() + this.randomInteger(3, 6));
            this.arrivalTime = currentDate;
        }
    }]);

    return Planes;
}(_AbstractToken2.AbstractToken);

exports.Planes = Planes;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Clouds = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Animate = __webpack_require__(0);

var _GameStates = __webpack_require__(2);

var _Moving2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class for clouds
 */
var Clouds = function (_Moving) {
    _inherits(Clouds, _Moving);

    function Clouds(pos, speed, scale, score) {
        _classCallCheck(this, Clouds);

        var _this = _possibleConstructorReturn(this, (Clouds.__proto__ || Object.getPrototypeOf(Clouds)).call(this));

        _this.score = score;
        _this.x = pos[0];
        _this.y = _this.startY = pos[1];
        _this.speedX = speed[0];
        _this.speedY = speed[1];
        _this.options = {
            'img': imgs.boom,
            'pos': [_this.x, _this.y],
            'size': [125, 125],
            'innerSize': [125, 125],
            'speedFrames': 2,
            'frames': [0, 1, 2, 3, 4, 5, 6, 7],
            'scale': scale,
            'once': true
        };
        _this.anim = new _Animate.Animate(_this.options);
        _this.alive = true;
        _this.booms = false;
        _this.boomsEnd = false;
        _this.collideWithHeli = false;
        _this.safe = false;
        return _this;
    }

    _createClass(Clouds, [{
        key: 'move',
        value: function move() {
            if (Math.round(this.y) === Math.round(this.startY + 30)) {
                this.speedY = -this.speedY;
            }
            if (Math.round(this.y) === Math.round(this.startY - 30)) {
                this.speedY = -this.speedY;
            }

            this.x -= this.speedX + this.score.score * 0.00008; //for increasing speed on another level
            this.y += this.speedY;

            if (this.x < -150) {
                this.alive = false;
            }
        }
    }, {
        key: 'draw',
        value: function draw(img) {
            this.context.drawImage(img, this.x, this.y);
        }
    }, {
        key: 'boom',
        value: function boom() {
            this.anim.pos[0] = this.x;
            this.anim.pos[1] = this.y;
            this.anim.update();
            this.anim.render(this.context);
            if (this.anim.done) {
                this.alive = false;
            }
        }
    }]);

    return Clouds;
}(_Moving2.Moving);

exports.Clouds = Clouds;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Clouder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Clouds = __webpack_require__(8);

var _Coins = __webpack_require__(5);

var _GameStates = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clouder = function () {
    function Clouder(score) {
        _classCallCheck(this, Clouder);

        this.clouds = [];
        this.time = Date.now();
        this.i = 0;
        this.booms = null;
        this.score = score;
    }

    _createClass(Clouder, [{
        key: 'randomInteger',
        value: function randomInteger(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
    }, {
        key: 'randomFloat',
        value: function randomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }
    }, {
        key: 'initClouds',
        value: function initClouds() {
            var img = void 0;
            var scale = void 0;
            var type = void 0;
            if (this.i % 3 === 0) {
                img = window.imgs.cloudS;
                scale = 0.6;
                type = 'small';
            }
            if (this.i % 3 === 1) {
                img = window.imgs.cloudM;
                scale = 0.8;
                type = 'medium';
            }
            if (this.i % 3 === 2) {
                img = window.imgs.cloudB;
                scale = 1.1;
                type = 'big';
            }
            var y = this.randomInteger(30, 200);
            var s1 = this.randomFloat(2, 3);
            var s2 = this.randomFloat(0.3, 0.6);
            var cloud = new _Clouds.Clouds([720, y], [s1, s2], scale, this.score);
            this.clouds.push({ 'cloud': cloud,
                'img': img,
                'type': type });
        }
    }, {
        key: 'animateClouds',
        value: function animateClouds() {
            for (var i = 0; i < this.clouds.length; i++) {
                // Only draw until we find a cloud that is not alive
                if (this.clouds[i].cloud.alive) {
                    this.clouds[i].cloud.move();
                    if (!this.clouds[i].cloud.booms) {
                        this.clouds[i].cloud.draw(this.clouds[i].img);
                    } else {
                        this.clouds[i].cloud.boom();
                    }
                }
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.clouds = [];
        }
    }, {
        key: 'cleaner',
        value: function cleaner() {
            for (var i = 0; i < this.clouds.length; i++) {
                if (this.clouds[i].cloud.alive === false) {
                    this.clouds.splice(i, 1);
                }
            }
        }
    }]);

    return Clouder;
}();

exports.Clouder = Clouder;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Coiner = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Clouds = __webpack_require__(8);

var _Coins = __webpack_require__(5);

var _GameStates = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coiner = function () {
    function Coiner(score) {
        _classCallCheck(this, Coiner);

        this.coins = [];
        this.score = score;
    }

    _createClass(Coiner, [{
        key: 'initCoins',
        value: function initCoins(type, pos) {
            var options = {
                'pos': [pos[0], pos[1]],
                'size': [30, 30],
                'innerSize': [30, 30],
                'speedFrames': 1.5
            };
            var speed = 2.5 + this.score.score * 0.00008;
            if (type === 'small') {
                var coin1 = new _Coins.Coins(options);
                this.coins.push({ 'coins': [coin1],
                    'speed': speed });
            } else if (type === 'medium') {
                options.pos[1] += 15;
                var _coin = new _Coins.Coins(options);
                var options1 = options;
                options1.pos[0] += 30;
                var coin2 = new _Coins.Coins(options1);
                this.coins.push({ 'coins': [_coin, coin2],
                    'speed': speed });
            } else if (type === 'big') {
                options.pos[1] += 30;
                var _coin2 = new _Coins.Coins(options);
                var _options = options;
                _options.pos[0] += 30;
                var _coin3 = new _Coins.Coins(options);
                var options2 = _options;
                options2.pos[0] += 30;
                var coin3 = new _Coins.Coins(options);
                this.coins.push({ 'coins': [_coin2, _coin3, coin3],
                    'speed': speed });
            }
        }
    }, {
        key: 'animateCoins',
        value: function animateCoins() {
            if (this.coins.length > 0) {
                for (var i = 0; i < this.coins.length; i++) {
                    for (var j = 0; j < this.coins[i].coins.length; j++) {
                        this.coins[i].coins[j].moving(this.coins[i].speed);
                    }
                }
            }
        }
    }, {
        key: 'cleaner',
        value: function cleaner() {
            for (var i = 0; i < this.coins.length; i++) {
                if (this.coins[i].coins[0]) {
                    if (this.coins[i].coins[0].coin.pos[0] < -150) {
                        this.coins.splice(i, 1);
                    }
                }
                if (this.coins[i]) {
                    if (this.coins[i].coins.length === 0) {
                        this.coins.splice(i, 1);
                    }
                }
            }
        }
    }]);

    return Coiner;
}();

exports.Coiner = Coiner;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Monsters = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Monster = __webpack_require__(29);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Monsters = function () {
    function Monsters(score) {
        _classCallCheck(this, Monsters);

        this.monsters = [];
        this.score = score;
        this.time = Date.now();
    }

    _createClass(Monsters, [{
        key: 'init',
        value: function init() {
            var speed = 1.5;
            var monster = new _Monster.Monster(speed, this.score);
            this.monsters.push(monster);
        }
    }, {
        key: 'animate',
        value: function animate() {
            for (var i = 0; i < this.monsters.length; i++) {
                this.monsters[i].move();
                this.monsters[i].fire();
                this.monsters[i].enemyBullets.animate();
            }
        }
    }, {
        key: 'cleaner',
        value: function cleaner() {
            for (var i = 0; i < this.monsters.length; i++) {
                if (!this.monsters[i].alive) {
                    this.monsters.splice(i, 1);
                }
            }
        }
    }]);

    return Monsters;
}();

exports.Monsters = Monsters;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MountainPart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Moving2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class for a moountain part
 */
var MountainPart = function (_Moving) {
    _inherits(MountainPart, _Moving);

    function MountainPart(prevMountain, img, speed, score) {
        _classCallCheck(this, MountainPart);

        var _this = _possibleConstructorReturn(this, (MountainPart.__proto__ || Object.getPrototypeOf(MountainPart)).call(this));

        _this.img = img;
        _this.speed = speed;
        _this.prevMountain = prevMountain;
        _this.locationInitialized = false;
        _this.score = score;
        if (prevMountain) {
            _this.firstMountain = false;
        } else {
            _this.firstMountain = true;
        }
        return _this;
    }

    _createClass(MountainPart, [{
        key: 'move',
        value: function move() {
            if (this.img.width == 0 || this.img.height == 0) {
                //img is not loaded yet
                return;
            }
            if (!this.locationInitialized) {
                this.locationInitialized = true;
                this.width = this.img.width;
                this.height = this.img.height;
                //init x
                if (this.firstMountain) {
                    this.x = 0;
                } else {
                    this.x = this.prevMountain.x + this.prevMountain.width;
                }
                //init y
                this.y = 480 - this.height;
            }

            this.x -= this.speed;
            if (this.x + this.width <= 0) {
                this.x = this.prevMountain.x + this.prevMountain.width - 1;
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.context.drawImage(this.img, this.x, this.y);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.context.clearRect(this.x, this.y, this.width, this.height);
        }
    }]);

    return MountainPart;
}(_Moving2.Moving);

exports.MountainPart = MountainPart;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Collisions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameStates = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collisions = function () {
    function Collisions(score) {
        _classCallCheck(this, Collisions);

        this.clouds = [];
        this.bullets = [];
        this.heli = null;
        this.coiner = [];
        this.fires = [];
        this.background = [];
        this.mountains = [];
        this.score = score;
        this.life = [];
        this.shield = [];
        this.power = [];
        this.gIg = [];
        this.gIgcoins = [];
        this.gIgtimer = null;
        this.planes = [];
        this.ground = null;
        this.monsters = [];
        this.enemyBullets = [];
    }

    _createClass(Collisions, [{
        key: 'checkCollision',
        value: function checkCollision(obj1, obj2) {
            if (obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.height + obj1.y > obj2.y) {
                return true;
            }
            return false;
        }
    }, {
        key: 'heliWithCloud',
        value: function heliWithCloud() {
            for (var i = 0; i < this.clouds.length; i++) {
                // alert(this.clouds[i].img.width);
                if (this.checkCollision({
                    x: this.heli.x,
                    width: this.heli.options.size[0],
                    y: this.heli.y,
                    height: this.heli.options.size[1]
                }, {
                    x: this.clouds[i].cloud.x,
                    width: this.clouds[i].img.width,
                    y: this.clouds[i].cloud.y,
                    height: this.clouds[i].img.height
                })) {
                    if (this.heli.god) {
                        return;
                    }
                    if (!this.clouds[i].cloud.safe) {
                        this.clouds[i].cloud.booms = true;
                        this.clouds[i].cloud.collideWithHeli = true;
                        this.score.onHeliWithCloud();
                        this.heli.flick = true;
                        this.heli.stars = true;
                    }
                }
            }
        }
    }, {
        key: 'heliWithCoins',
        value: function heliWithCoins() {
            for (var i = 0; i < this.coiner.coins.length; i++) {
                for (var j = 0; j < this.coiner.coins[i].coins.length; j++) {
                    if (this.checkCollision({
                        x: this.heli.x,
                        width: this.heli.options.size[0],
                        y: this.heli.y,
                        height: this.heli.options.size[1]
                    }, {
                        x: this.coiner.coins[i].coins[j].options.pos[0],
                        width: this.coiner.coins[i].coins[j].options.size[0],
                        y: this.coiner.coins[i].coins[j].options.pos[1],
                        height: this.coiner.coins[i].coins[j].options.size[1]
                    })) {
                        this.coiner.coins[i].coins.shift();
                        this.score.onHeliWithCoins();
                    }
                }
            }
        }
    }, {
        key: 'bulletWithCloud',
        value: function bulletWithCloud() {
            for (var j = 0; j < this.bullets.length; j++) {
                for (var i = 0; i < this.clouds.length; i++) {
                    if (this.checkCollision({
                        x: this.bullets[j].options.pos[0],
                        width: this.bullets[j].options.size[0],
                        y: this.bullets[j].options.pos[1],
                        height: this.bullets[j].options.size[1]
                    }, {
                        x: this.clouds[i].cloud.x,
                        width: this.clouds[i].img.width,
                        y: this.clouds[i].cloud.y,
                        height: this.clouds[i].img.height
                    })) {
                        if (this.clouds[i].cloud.safe) {
                            return;
                        }
                        this.clouds[i].cloud.booms = true;
                        this.clouds[i].cloud.safe = true;
                        this.bullets[j].clear();
                        this.score.onBulletWithCloud();
                        this.coiner.initCoins(this.clouds[i].type, [this.clouds[i].cloud.x, this.clouds[i].cloud.y]);
                    }
                }
            }
        }
    }, {
        key: 'fireWithClouds',
        value: function fireWithClouds() {
            for (var j = 0; j < this.fires.length; j++) {
                for (var i = 0; i < this.clouds.length; i++) {
                    if (this.checkCollision({
                        x: this.fires[j].animate.pos[0],
                        width: this.fires[j].animate.size[0],
                        y: this.fires[j].animate.pos[1],
                        height: this.fires[j].animate.size[1]
                    }, {
                        x: this.clouds[i].cloud.x,
                        width: this.clouds[i].img.width,
                        y: this.clouds[i].cloud.y,
                        height: this.clouds[i].img.height
                    })) {
                        if (this.clouds[i].cloud.safe) {
                            return;
                        }
                        this.clouds[i].cloud.booms = true;
                        this.clouds[i].cloud.safe = true;
                        this.score.onBulletWithCloud();
                        this.coiner.initCoins(this.clouds[i].type, [this.clouds[i].cloud.x, this.clouds[i].cloud.y]);
                    }
                }
            }
        }
    }, {
        key: 'heliWithMountain',
        value: function heliWithMountain() {
            for (var i = 0; i < this.mountains.length; i++) {
                if (this.checkCollision({
                    x: this.heli.x,
                    width: this.heli.options.size[0],
                    y: this.heli.y,
                    height: this.heli.options.size[1]
                }, {
                    x: this.mountains[i].x,
                    width: this.mountains[i].width,
                    y: this.mountains[i].y,
                    height: this.mountains[i].img.height
                })) {
                    if (this.heli.god) {
                        return;
                    }
                    if (!this.heli.flick) {
                        this.heli.flick = true;
                        this.heli.stars = true;
                        this.score.onheliWithMountain();
                    }
                }
            }
        }
    }, {
        key: 'heliWithLife',
        value: function heliWithLife() {
            for (var i = 0; i < this.life.length; i++) {
                if (this.checkCollision({
                    x: this.heli.x, width: this.heli.options.size[0],
                    y: this.heli.y, height: this.heli.options.size[1]
                }, {
                    x: this.life[i].animate.pos[0], width: this.life[i].animate.size[0],
                    y: this.life[i].animate.pos[1], height: this.life[i].animate.size[1]
                })) {
                    this.life[i].alive = false;
                    if (this.score.lives < 3) {
                        this.score.lives++;
                    }
                }
            }
        }
    }, {
        key: 'heliWithShield',
        value: function heliWithShield() {
            for (var i = 0; i < this.shield.length; i++) {
                if (this.checkCollision({
                    x: this.heli.x, width: this.heli.options.size[0],
                    y: this.heli.y, height: this.heli.options.size[1]
                }, {
                    x: this.shield[i].x, width: this.shield[i].img.width,
                    y: this.shield[i].y, height: this.shield[i].img.height
                })) {
                    this.shield[i].alive = false;
                    this.heli.flick = true;
                    this.heli.tokenShield = true;
                }
            }
        }
    }, {
        key: 'heliWithPower',
        value: function heliWithPower() {
            for (var i = 0; i < this.power.length; i++) {
                if (this.checkCollision({
                    x: this.heli.x, width: this.heli.options.size[0],
                    y: this.heli.y, height: this.heli.options.size[1]
                }, {
                    x: this.power[i].animate.pos[0], width: this.power[i].animate.size[0],
                    y: this.power[i].animate.pos[1], height: this.power[i].animate.size[1]
                })) {
                    this.power[i].alive = false;
                    this.heli.canFire = true;
                    this.score.fireImg = window.imgs.fireIcon;
                }
            }
        }
    }, {
        key: 'heliWithgIg',
        value: function heliWithgIg() {
            for (var i = 0; i < this.gIg.length; i++) {
                if (this.checkCollision({
                    x: this.heli.x, width: this.heli.options.size[0],
                    y: this.heli.y, height: this.heli.options.size[1]
                }, {
                    x: this.gIg[i].animate.pos[0], width: this.gIg[i].animate.size[0],
                    y: this.gIg[i].animate.pos[1], height: this.gIg[i].animate.size[1]
                })) {
                    this.gIg[i].alive = false;
                    this.score.gIg = true;
                    this.gIgtimer.init(11);
                }
            }
        }
    }, {
        key: 'heliWithPlane',
        value: function heliWithPlane() {
            for (var i = 0; i < this.planes.length; i++) {
                if (this.checkCollision({
                    x: this.heli.x, width: this.heli.options.size[0],
                    y: this.heli.y, height: this.heli.options.size[1]
                }, {
                    x: this.planes[i].x, width: this.planes[i].img.width,
                    y: this.planes[i].y, height: this.planes[i].img.height
                })) {
                    if (!this.heli.flick) {
                        this.planes[i].booms = true;
                        this.heli.flick = true;
                        this.heli.stars = true;
                        this.score.onHeliWithPlane();
                    }
                }
            }
        }
    }, {
        key: 'gIgHeliWithCoin',
        value: function gIgHeliWithCoin() {
            for (var i = 0; i < this.gIgcoins.length; i++) {
                if (this.checkCollision({
                    x: this.heli.x, width: this.heli.options.size[0],
                    y: this.heli.y, height: this.heli.options.size[1]
                }, {
                    x: this.gIgcoins[i].coin.pos[0], width: this.gIgcoins[i].coin.size[0],
                    y: this.gIgcoins[i].coin.pos[1], height: this.gIgcoins[i].coin.size[1]
                })) {
                    this.gIgcoins[i].alive = false;
                    this.score.onHeliWithCoins();
                }
            }
        }
    }, {
        key: 'bulletWithPlane',
        value: function bulletWithPlane() {
            for (var j = 0; j < this.bullets.length; j++) {
                for (var i = 0; i < this.planes.length; i++) {
                    if (this.checkCollision({
                        x: this.bullets[j].options.pos[0],
                        width: this.bullets[j].options.size[0],
                        y: this.bullets[j].options.pos[1],
                        height: this.bullets[j].options.size[1]
                    }, {
                        x: this.planes[i].x,
                        width: this.planes[i].img.width,
                        y: this.planes[i].y,
                        height: this.planes[i].img.height
                    })) {
                        this.planes[i].booms = true;
                        this.bullets[j].clear();
                        this.score.onBulletWithPlane();
                    }
                }
            }
        }
    }, {
        key: 'heliWithGround',
        value: function heliWithGround() {
            if (this.checkCollision({
                x: this.heli.x, width: this.heli.options.size[0],
                y: this.heli.y, height: this.heli.options.size[1]
            }, {
                x: -this.ground.x, width: this.ground.groundImg.width,
                y: this.ground.y, height: this.ground.groundImg.height
            })) {
                if (!this.heli.flick) {
                    this.heli.flick = true;
                    this.heli.stars = true;
                    this.score.onHeliWithGround();
                }
            }
        }
    }, {
        key: 'heliWithMonster',
        value: function heliWithMonster() {
            for (var i = 0; i < this.monsters.monsters.length; i++) {
                if (this.checkCollision({
                    x: this.heli.x, width: this.heli.options.size[0],
                    y: this.heli.y, height: this.heli.options.size[1]
                }, {
                    x: this.monsters.monsters[i].animate.pos[0], width: this.monsters.monsters[i].animate.size[0],
                    y: this.monsters.monsters[i].animate.pos[1], height: this.monsters.monsters[i].animate.size[1]
                })) {
                    if (!this.heli.flick) {
                        this.heli.flick = true;
                        this.heli.stars = true;
                        this.score.onHeliWithEnemy();
                    }
                }
            }
        }
    }, {
        key: 'bulletWithMonster',
        value: function bulletWithMonster() {
            for (var j = 0; j < this.bullets.length; j++) {
                for (var i = 0; i < this.monsters.monsters.length; i++) {
                    if (this.checkCollision({
                        x: this.bullets[j].options.pos[0],
                        width: this.bullets[j].options.size[0],
                        y: this.bullets[j].options.pos[1],
                        height: this.bullets[j].options.size[1]
                    }, {
                        x: this.monsters.monsters[i].animate.pos[0], width: this.monsters.monsters[i].animate.size[0],
                        y: this.monsters.monsters[i].animate.pos[1], height: this.monsters.monsters[i].animate.size[1]
                    })) {
                        this.bullets[j].clear();
                        this.monsters.monsters[i].clear();
                        this.score.onScoreEnemy();
                    }
                }
            }
        }
    }, {
        key: 'fireWithMonster',
        value: function fireWithMonster() {
            for (var i = 0; i < this.monsters.monsters.length; i++) {
                for (var j = 0; j < this.fires.length; j++) {
                    if (this.checkCollision({
                        x: this.fires[j].animate.pos[0],
                        width: this.fires[j].animate.size[0],
                        y: this.fires[j].animate.pos[1],
                        height: this.fires[j].animate.size[1]
                    }, {
                        x: this.monsters.monsters[i].animate.pos[0], width: this.monsters.monsters[i].animate.size[0],
                        y: this.monsters.monsters[i].animate.pos[1], height: this.monsters.monsters[i].animate.size[1]
                    })) {
                        this.monsters.monsters[i].clear();
                        this.score.onScoreEnemy();
                    }
                }
            }
        }
    }, {
        key: 'enemyBulletWithHeli',
        value: function enemyBulletWithHeli() {
            for (var i = 0; i < this.monsters.monsters.length; i++) {
                for (var j = 0; j < this.monsters.monsters[i].enemyBullets.eBullets.length; j++) {
                    if (this.checkCollision({
                        x: this.heli.x, width: this.heli.options.size[0],
                        y: this.heli.y, height: this.heli.options.size[1]
                    }, {
                        x: this.monsters.monsters[i].enemyBullets.eBullets[j].options.pos[0], width: this.monsters.monsters[i].enemyBullets.eBullets[j].options.size[0],
                        y: this.monsters.monsters[i].enemyBullets.eBullets[j].options.pos[1], height: this.monsters.monsters[i].enemyBullets.eBullets[j].options.size[1]
                    })) {
                        if (!this.heli.flick) {
                            this.heli.flick = true;
                            this.heli.stars = true;
                            this.score.onHeliWithEnemy();
                        }
                    }
                }
            }
        }
    }]);

    return Collisions;
}();

exports.Collisions = Collisions;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Background = __webpack_require__(25);

var _Clouder = __webpack_require__(9);

var _Coiner = __webpack_require__(10);

var _Animate = __webpack_require__(0);

var _Heli = __webpack_require__(28);

var _Moving = __webpack_require__(1);

var _Collisions = __webpack_require__(13);

var _Mountains = __webpack_require__(6);

var _MountainPart = __webpack_require__(12);

var _GameStates = __webpack_require__(2);

var _Tokener = __webpack_require__(18);

var _AbstractToken = __webpack_require__(3);

var _gameInGame = __webpack_require__(32);

var _Timer = __webpack_require__(33);

var _Planes = __webpack_require__(7);

var _Ground = __webpack_require__(27);

var _Sound = __webpack_require__(4);

var _Monsters = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * It is main class of our game, where implementing all logic
 */
var Game = function () {
    function Game() {
        _classCallCheck(this, Game);
    }

    _createClass(Game, [{
        key: 'init',

        /*
         * Gets canvas information and context and sets up all game objects.
         */
        value: function init() {
            this.sounds = new _Sound.Sound();
            // Get the canvas element
            this.canvas = document.getElementById('canvas');
            this.isStarted = false;

            // Test to see if canvas is supported
            if (this.canvas.getContext) {
                this.ctx = this.canvas.getContext('2d');
                _Moving.Moving.prototype.context = this.ctx;
                _Moving.Moving.prototype.canvasWidth = this.canvas.width;
                _Moving.Moving.prototype.canvasHeight = this.canvas.height;
                _AbstractToken.AbstractToken.prototype.context = this.ctx;
                _AbstractToken.AbstractToken.prototype.canvasWidth = this.canvas.width;
                _AbstractToken.AbstractToken.prototype.canvasHeight = this.canvas.height;
                this.timer = new _Timer.Timer();
                this.timer.init();
                this.background = new _Background.Background();
                this.background.init(0, 0);
                this.score = new _GameStates.Score(this);
                this.score.init(520, 2);
                this.mountains = new _Mountains.Mountains(this.score);
                this.mountains.init();
                this.clouds = new _Clouder.Clouder(this.score);
                this.coiner = new _Coiner.Coiner(this.score);
                this.heli = new _Heli.Heli(this.score);
                this.heli.init(40, 120);
                this.score.heli = this.heli;
                this.monsters = new _Monsters.Monsters(this.score);
                this.tokener = new _Tokener.Tokener(this.score, this.timer);
                this.collisions = new _Collisions.Collisions(this.score);
                this.gIgcoins = new _gameInGame.gameInGame();
                this.ground = new _Ground.Ground(this.score);
                this.score.gIgObj = this.gIgcoins.coins;
                this.background.score = this.score;
                this.ground.gameState = this.score;
                this.collisions.heli = this.heli;
                this.collisions.clouds = this.clouds.clouds;
                this.collisions.coiner = this.coiner;
                this.collisions.bullets = this.heli.bullets.pool;
                this.collisions.mountains = this.mountains.mountArray;
                this.collisions.life = this.tokener.life;
                this.collisions.shield = this.tokener.shield;
                this.collisions.power = this.tokener.power;
                this.collisions.fires = this.heli.firer.fires;
                this.collisions.gIg = this.tokener.gIg;
                this.collisions.monsters = this.monsters;

                this.gIgtimer = new _Timer.Timer();
                this.collisions.gIgtimer = this.gIgtimer;
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'animate',
        value: function animate() {
            if (!this.isStarted) {
                return;
            }
            this.sounds.play();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.background.checkImg();
            this.background.draw();
            if (this.score.level === 1) {
                this.mountains.draw();
                this.mountains.move();
            }
            if (this.score.level >= 2) {
                this.ground.chooseGround();
                this.ground.draw();
                this.planes.draw();
                this.planes.move();
                this.collisions.heliWithGround();
                this.collisions.bulletWithMonster();
                this.collisions.fireWithMonster();
                this.collisions.enemyBulletWithHeli();
            }
            if (this.score.level >= 3) {
                this.monsters.animate();
                this.monsters.cleaner();

                if (this.monsters.time + 7000 - this.score.score * 0.08 < Date.now()) {
                    this.monsters.init();
                    this.monsters.time = Date.now();
                }
            }
            this.heli.draw();
            this.heli.move();
            this.tokener.initTokens();
            this.tokener.moveTokens();
            this.tokener.cleanTokens();
            this.heli.bullets.animate();
            this.heli.bullets.cleaner();
            this.heli.firer.animate();
            this.heli.firer.cleaner();
            this.clouds.animateClouds();
            this.coiner.animateCoins();
            this.coiner.cleaner();
            this.clouds.cleaner();

            this.collisions.heliWithCloud();
            this.collisions.heliWithCoins();
            this.collisions.bulletWithCloud();
            this.collisions.heliWithMountain();
            this.collisions.heliWithLife();
            this.collisions.heliWithShield();
            this.collisions.heliWithPower();
            this.collisions.fireWithClouds();
            this.collisions.heliWithgIg();
            this.collisions.heliWithPlane();
            this.collisions.bulletWithPlane();
            this.collisions.heliWithMonster();
            this.score.draw();
            this.score.draw2();
            if (this.clouds.time + 1400 - this.score.score * 0.017 < Date.now()) {
                this.clouds.initClouds();
                this.clouds.time = Date.now();
                this.clouds.i++;
            }
        }
    }, {
        key: 'gIganimate',
        value: function gIganimate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (!this.gIgcoins.coins.length) {
                this.gIgcoins.init();
                this.collisions.gIgcoins = this.gIgcoins.coins;
            }
            this.background.drawgIg();
            this.heli.draw();
            this.heli.move();
            this.collisions.gIgHeliWithCoin();
            this.score.drawWithoutLevel();
            this.gIgcoins.animateCoins();
            this.gIgcoins.cleaner();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            delete this.background;
            delete this.mountains;
            delete this.score;
            delete this.clouds;
            delete this.coiner;
            delete this.heli;
            delete this.planes;
            delete this.tokener;
            delete this.collisions;
            delete this.gIgcoins;
            delete this.sounds;
        }

        // Start our game and game loop

    }, {
        key: 'start',
        value: function start(animate) {
            this.isStarted = true;
            animate(this.ctx);
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.isStarted = false;
        }
    }]);

    return Game;
}();

exports.Game = Game;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var imgsLoader = exports.imgsLoader = function imgsLoader(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var _src in sources) {
        images[_src] = new Image();
        images[_src].onload = function () {
            if (++loadedImages >= numImages && callback) {
                callback(images);
            }
        };
        images[_src].src = sources[_src];
    }
    return images;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var soundLoader = exports.soundLoader = function soundLoader(sources, callback) {
    var sounds = {};
    var loadedSounds = 0;
    var numSounds = 0;
    // get num of sources
    for (var src in sources) {
        numSounds++;
    }
    for (var _src in sources) {
        sounds[_src] = new Audio();
        sounds[_src].onload = function () {
            if (++loadedSounds >= numSounds && callback) {
                callback(sounds);
            }
        };
        sounds[_src].src = sources[_src];
    }
    return sounds;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Firer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Fire = __webpack_require__(26);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Firer = function () {
    function Firer(height) {
        _classCallCheck(this, Firer);

        this.fires = [];
        this.canvasHeight = height;
        this.height = 0;
    }

    /*
    * Populates the pool array with Bullet objects
    */


    _createClass(Firer, [{
        key: 'init',
        value: function init() {
            while (this.height <= 300) {
                var fire = new _Fire.Fire();
                fire.animate.pos[1] = this.height;
                this.fires.push(fire);
                this.height += fire.options.img.height;
            }
        }

        /*
         * Draws any in use Bullets. If a bullet goes off the screen,
         * clears it and pushes it to the front of the array.
         */

    }, {
        key: 'animate',
        value: function animate() {
            for (var i = 0; i < this.fires.length; i++) {
                this.fires[i].draw();
            }
        }
    }, {
        key: 'cleaner',
        value: function cleaner() {
            for (var i = 0; i < this.fires.length; i++) {
                if (!this.fires[i].alive) {
                    this.fires.splice(i, 1);
                    this.height = 0;
                }
            }
        }
    }]);

    return Firer;
}();

exports.Firer = Firer;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tokener = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Life = __webpack_require__(20);

var _Shield = __webpack_require__(22);

var _Power = __webpack_require__(21);

var _gIg = __webpack_require__(23);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tokener = function () {
    function Tokener(score, timer) {
        _classCallCheck(this, Tokener);

        this.score = score;
        this.lifeFrequency = 90;
        this.shieldFrequency = 60;
        this.powerFrequency = 50;
        this.gIgFrequency = 30;
        this.shield = [];
        this.life = [];
        this.power = [];
        this.gIg = [];
        this.speed = 2;
        this.timer = timer;
    }

    _createClass(Tokener, [{
        key: 'randomInteger',
        value: function randomInteger(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
    }, {
        key: 'randomFloat',
        value: function randomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }
    }, {
        key: 'initTokens',
        value: function initTokens() {
            if (this.timer.tick() >= this.lifeFrequency) {
                if (this.score.lives >= 3) {
                    this.lifeFrequency += 22;
                    return;
                }
                this.life.push(new _Life.Life());
                this.lifeFrequency += 94;
            }
            if (this.timer.tick() >= this.shieldFrequency) {
                this.shield.push(new _Shield.Shield());
                this.shieldFrequency += 54;
            }
            if (this.timer.tick() >= this.powerFrequency) {
                this.power.push(new _Power.Power());
                this.powerFrequency += 46;
            }
            if (this.timer.tick() >= this.gIgFrequency) {
                this.gIg.push(new _gIg.gIg());
                this.gIgFrequency += 73;
            }
        }
    }, {
        key: 'moveTokens',
        value: function moveTokens() {
            for (var i = 0; i < this.life.length; i++) {
                this.life[i].move(this.speed + this.score.score * 0.00008);
                this.life[i].draw();
            }
            for (var _i = 0; _i < this.shield.length; _i++) {
                this.shield[_i].move(this.speed + this.score.score * 0.00008);
                this.shield[_i].draw();
            }
            for (var _i2 = 0; _i2 < this.power.length; _i2++) {
                this.power[_i2].move(this.speed + this.score.score * 0.00008);
                this.power[_i2].draw();
            }
            for (var _i3 = 0; _i3 < this.gIg.length; _i3++) {
                this.gIg[_i3].move(this.speed + this.score.score * 0.00008);
                this.gIg[_i3].draw();
            }
        }
    }, {
        key: 'cleanTokens',
        value: function cleanTokens() {
            for (var i = 0; i < this.life.length; i++) {
                if (!this.life[i].alive) {
                    this.life.splice(i, 1);
                }
            }
            for (var _i4 = 0; _i4 < this.shield.length; _i4++) {
                if (!this.shield[_i4].alive) {
                    this.shield.splice(_i4, 1);
                }
            }
            for (var _i5 = 0; _i5 < this.power.length; _i5++) {
                if (!this.power[_i5].alive) {
                    this.power.splice(_i5, 1);
                }
            }
            for (var _i6 = 0; _i6 < this.gIg.length; _i6++) {
                if (!this.gIg[_i6].alive) {
                    this.gIg.splice(_i6, 1);
                }
            }
        }
    }]);

    return Tokener;
}();

exports.Tokener = Tokener;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.enemyBullets = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _enemyBullet = __webpack_require__(30);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var enemyBullets = function () {
    function enemyBullets(score) {
        _classCallCheck(this, enemyBullets);

        this.eBullets = [];
        this.score = score;
    }

    /*
    * Populates the pool array with Bullet objects
    */


    _createClass(enemyBullets, [{
        key: 'init',
        value: function init(x, y, speed) {
            // Initalize the bullet object
            var bullet = new _enemyBullet.enemyBullet(this.score);
            bullet.spawn(x, y, speed);
            this.eBullets.push(bullet);
        }
    }, {
        key: 'animate',


        /*
         * Draws any in use Bullets. If a bullet goes off the screen,
         * clears it and pushes it to the front of the array.
         */
        value: function animate() {
            for (var i = 0; i < this.eBullets.length; i++) {
                if (this.eBullets[i] && this.eBullets[i].alive) {
                    this.eBullets[i].draw();
                } else {
                    continue;
                }
            }
        }
    }, {
        key: 'cleaner',
        value: function cleaner() {
            for (var i = 0; i < this.eBullets.length; i++) {
                if (this.eBullets[i].alive === false) {
                    this.eBullets.splice(i, 1);
                }
            }
        }
    }]);

    return enemyBullets;
}();

exports.enemyBullets = enemyBullets;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Life = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractToken2 = __webpack_require__(3);

var _Animate = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Life = function (_AbstractToken) {
    _inherits(Life, _AbstractToken);

    function Life() {
        _classCallCheck(this, Life);

        var _this = _possibleConstructorReturn(this, (Life.__proto__ || Object.getPrototypeOf(Life)).call(this));

        var options = {
            img: window.imgs.health,
            pos: [720, _this.randomInteger(20, 250)],
            size: [30, 27],
            innerSize: [30, 27],
            speedFrames: 6,
            frames: [0, 1, 2, 3, 4, 5, 6, 7]
        };
        _this.animate = new _Animate.Animate(options);
        _this.alive = true;
        return _this;
    }

    _createClass(Life, [{
        key: 'move',
        value: function move(speed) {
            this.animate.pos[0] -= speed;
            if (this.animate.pos[0] <= -50) {
                this.alive = false;
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.animate.update();
            this.animate.render(this.context);
        }
    }]);

    return Life;
}(_AbstractToken2.AbstractToken);

exports.Life = Life;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Power = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractToken2 = __webpack_require__(3);

var _Animate = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Power = function (_AbstractToken) {
    _inherits(Power, _AbstractToken);

    function Power() {
        _classCallCheck(this, Power);

        var _this = _possibleConstructorReturn(this, (Power.__proto__ || Object.getPrototypeOf(Power)).call(this));

        var options = {
            img: window.imgs.power,
            pos: [720, _this.randomInteger(20, 250)],
            size: [30, 30],
            innerSize: [30, 30],
            speedFrames: 6,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        };
        _this.animate = new _Animate.Animate(options);
        _this.alive = true;
        return _this;
    }

    _createClass(Power, [{
        key: 'move',
        value: function move(speed) {
            this.animate.pos[0] -= speed;
            if (this.animate.pos[0] <= -50) {
                this.alive = false;
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.animate.update();
            this.animate.render(this.context);
        }
    }]);

    return Power;
}(_AbstractToken2.AbstractToken);

exports.Power = Power;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Shield = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractToken2 = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shield = function (_AbstractToken) {
    _inherits(Shield, _AbstractToken);

    function Shield() {
        _classCallCheck(this, Shield);

        var _this = _possibleConstructorReturn(this, (Shield.__proto__ || Object.getPrototypeOf(Shield)).call(this));

        _this.img = window.imgs.shield;
        _this.x = 720;
        _this.y = _this.randomInteger(20, 250);
        _this.alive = true;
        return _this;
    }

    _createClass(Shield, [{
        key: 'move',
        value: function move(speed) {
            this.x -= speed;
            if (this.x <= -50) {
                this.alive = false;
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.context.drawImage(this.img, this.x, this.y);
        }
    }]);

    return Shield;
}(_AbstractToken2.AbstractToken);

exports.Shield = Shield;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gIg = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractToken2 = __webpack_require__(3);

var _Animate = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var gIg = function (_AbstractToken) {
    _inherits(gIg, _AbstractToken);

    function gIg() {
        _classCallCheck(this, gIg);

        var _this = _possibleConstructorReturn(this, (gIg.__proto__ || Object.getPrototypeOf(gIg)).call(this));

        var options = {
            img: window.imgs.gIg,
            pos: [720, _this.randomInteger(20, 250)],
            size: [30, 30],
            innerSize: [30, 30],
            speedFrames: 6,
            frames: [0, 1, 2, 3, 4, 5, 6, 7]
        };
        _this.animate = new _Animate.Animate(options);
        _this.alive = true;
        return _this;
    }

    _createClass(gIg, [{
        key: 'move',
        value: function move(speed) {
            this.animate.pos[0] -= speed;
            if (this.animate.pos[0] <= -50) {
                this.alive = false;
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.animate.update();
            this.animate.render(this.context);
        }
    }]);

    return gIg;
}(_AbstractToken2.AbstractToken);

exports.gIg = gIg;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(14);

var _imgLoader = __webpack_require__(15);

var _soundLoader = __webpack_require__(16);

var _Mountains = __webpack_require__(6);

var _GameStates = __webpack_require__(2);

var _Planes = __webpack_require__(7);

var _Sound = __webpack_require__(4);

var menu = document.getElementById('menu');
var hide = function hide(el) {
    el.style.display = 'none';
    window.game.pause = false;
    init();
};

document.querySelectorAll('.play')[0].addEventListener('click', function () {
    hide(menu);
});

window.imgs = (0, _imgLoader.imgsLoader)({
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
    'shieldIcTr': './imgs/shieldIcTr.png'
});

window.mountainImgs = (0, _imgLoader.imgsLoader)({
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

window.sounds = (0, _soundLoader.soundLoader)({
    'backgroundTrack': './sounds/backgroundTrack.mp3',
    'shoot': './sounds/shoot.wav',
    'gameover': './sounds/game-over.wav',
    'coins': './sounds/coins.wav',
    'explos': './sounds/explos.wav',
    'collis': './sounds/collis.flac'

});

var game = new _Game.Game();
window.game = game;

function init() {

    if (game.init()) {
        game.start(animate);
    }
}

window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
    };
}();

//Function for updating
var animate = function animate(ctx) {
    if (game.score.gIg) {
        game.heli.canBullet = false;
        game.gIgtimer.tick();
        if (game.gIgtimer.check()) {
            game.gIgcoins.destroy();
            game.collisions.gIgcoins = [];
            game.heli.y = 120;
            game.heli.flick = true;
            game.gIgtimer.clear();
            game.heli.canBullet = true;
            game.score.gIg = false;
        }
        game.gIganimate();
    } else {
        game.animate();
    }
    requestAnimFrame(animate);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Background = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Moving2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class for clouds
 */

var Background = function (_Moving) {
    _inherits(Background, _Moving);

    function Background() {
        _classCallCheck(this, Background);

        var _this = _possibleConstructorReturn(this, (Background.__proto__ || Object.getPrototypeOf(Background)).call(this));

        _this.speed = 0.8;
        _this.img = window.imgs.background;
        _this.score;
        return _this;
    }

    _createClass(Background, [{
        key: 'draw',
        value: function draw() {
            this.x += this.speed;
            this.context.drawImage(this.img, -this.x, this.y);
            this.context.drawImage(this.img, -this.x + this.canvasWidth, this.y);
            if (this.x >= this.canvasWidth) this.x = 0;
        }
    }, {
        key: 'drawgIg',
        value: function drawgIg() {
            this.x += 4;
            this.context.drawImage(window.imgs.gIgBG, -this.x, this.y);
            this.context.drawImage(window.imgs.gIgBG, -this.x + this.canvasWidth, this.y);
            if (this.x >= this.canvasWidth) {
                this.x = 0;
            }
        }
    }, {
        key: 'checkImg',
        value: function checkImg() {
            if (this.score.level === 2) {
                this.img = window.imgs.background2;
            }
            if (this.score.level === 3) {
                this.img = window.imgs.background3;
            }
        }
    }]);

    return Background;
}(_Moving2.Moving);

exports.Background = Background;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Fire = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Moving2 = __webpack_require__(1);

var _Animate = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fire = function (_Moving) {
	_inherits(Fire, _Moving);

	function Fire() {
		_classCallCheck(this, Fire);

		var _this = _possibleConstructorReturn(this, (Fire.__proto__ || Object.getPrototypeOf(Fire)).call(this));

		_this.alive = true;
		_this.x = 0;
		_this.y = 0;
		_this.speed = 3;
		_this.options = {
			'img': window.imgs.fire,
			'pos': [_this.x, _this.y],
			'size': [84, 50],
			'innerSize': [84, 50],
			'speedFrames': 5,
			'frames': [0, 1, 2, 3]
		};
		_this.animate = new _Animate.Animate(_this.options);
		return _this;
	}

	/*
  * Uses a "drity rectangle" to erase the bullet and moves it.
  * Returns true if the bullet moved off the screen, indicating that
  * the bullet is ready to be cleared by the pool, otherwise draws
  * the bullet.
  */


	_createClass(Fire, [{
		key: 'draw',
		value: function draw() {
			this.x += this.speed;
			this.options.pos[0] = this.x;
			this.animate.update();
			this.animate.render(this.context);
			if (this.x >= this.canvasWidth) {
				this.alive = false;
			}
		}

		/*
   * Resets the bullet values
   */

	}, {
		key: 'clear',
		value: function clear() {
			this.alive = false;
		}
	}]);

	return Fire;
}(_Moving2.Moving);

exports.Fire = Fire;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Ground = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Moving2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ground = function (_Moving) {
    _inherits(Ground, _Moving);

    function Ground(score) {
        _classCallCheck(this, Ground);

        var _this = _possibleConstructorReturn(this, (Ground.__proto__ || Object.getPrototypeOf(Ground)).call(this));

        _this.gameState;
        _this.groundImg = null;
        _this.x = 0;
        _this.y = 0;
        _this.score = score;
        return _this;
    }

    _createClass(Ground, [{
        key: 'chooseGround',
        value: function chooseGround() {
            if (this.gameState.level === 2) {
                this.groundImg = window.imgs.ground;
                this.y = this.canvasHeight - this.groundImg.height;
            } else if (this.gameState.level === 3) {
                this.groundImg = window.imgs.ground2;
                this.y = this.canvasHeight - this.groundImg.height;
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            // console.log(this.gameState.level);
            if (this.gameState.level >= 2) {
                this.x += 1.5 + this.score.score * 0.00008;
                this.context.drawImage(this.groundImg, -this.x, this.y);
                this.context.drawImage(this.groundImg, -this.x + this.canvasWidth, this.y);
                if (this.x >= this.canvasWidth) {
                    this.x = 0;
                }
            }
        }
    }]);

    return Ground;
}(_Moving2.Moving);

exports.Ground = Ground;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Heli = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Moving2 = __webpack_require__(1);

var _Animate = __webpack_require__(0);

var _BulletPool = __webpack_require__(34);

var _GameStates = __webpack_require__(2);

var _Firer = __webpack_require__(17);

var _Sound = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class for helicopter
 */

var Heli = function (_Moving) {
    _inherits(Heli, _Moving);

    function Heli(score) {
        _classCallCheck(this, Heli);

        var _this = _possibleConstructorReturn(this, (Heli.__proto__ || Object.getPrototypeOf(Heli)).call(this));

        _this.sounds = window.sounds.shoot;
        _this.speed = 6;
        _this.gravity = 1.5;
        _this.options = {
            'img': window.imgs.heli,
            'pos': [_this.x, _this.y],
            'size': [80, 70],
            'innerSize': [80, 70],
            'speedFrames': 5,
            'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        };
        _this.animate = new _Animate.Animate(_this.options);
        _this.bullets = new _BulletPool.BulletPool();
        _this.bullets.init();
        _this.firer = new _Firer.Firer(_this.canvasHeight);
        _this.counter = 0;
        _this.fireRate = 40;
        _this.fireSpeed = 3;
        _this.flick = false;
        _this.counterFlick = 0;
        _this.flickState = 1;
        _this.counterFlickTime = 0;
        _this.god = false;
        _this.score = score;
        _this.stars = false;
        _this.tokenShield = false;
        _this.canFire = false;
        _this.canBullet = true;
        return _this;
    }

    _createClass(Heli, [{
        key: 'draw',
        value: function draw() {
            var flickRate = 20;
            this.flickTime = this.tokenShield ? 400 : 150;
            var img = new Image();
            var animImg = window.imgs.heli;
            if (this.stars) {
                this.animate.frames = [0, 1];
                animImg = window.imgs.heliStars;
            }
            if (this.flick) {
                if (this.counterFlickTime < this.flickTime) {
                    this.god = true;
                    this.counterFlickTime++;
                    this.counterFlick++;
                    if (this.counterFlick >= flickRate && this.flickState === 1) {
                        this.animate.img = animImg;
                        this.counterFlick = 0;
                        this.flickState = 2;
                    }
                    if (this.counterFlick >= flickRate && this.flickState === 2) {
                        this.animate.img = img;
                        this.counterFlick = 0;
                        this.flickState = 1;
                    }
                } else {
                    this.counterFlickTime = 0;
                    this.flick = false;
                    this.god = false;
                    this.stars = false;
                    this.tokenShield = false;
                    this.animate.img = window.imgs.heli;
                    this.animate.size[0] = 80;
                    this.animate.innerSize[0] = 80;
                    this.animate.frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                }
            }
            this.options.pos[0] = this.x;
            this.options.pos[1] = this.y;
            this.animate.update();
            this.animate.render(this.context);
        }
    }, {
        key: 'move',
        value: function move() {
            this.counter++;
            if (KEY_STATUS.up) {
                this.y -= this.speed - this.gravity;
            } else if (KEY_STATUS.down) {
                this.y += this.speed;
            } else {
                this.y += this.gravity;
            }
            if (this.y < 0) {
                this.y = 0;
            }
            if (this.y > this.canvasHeight - window.imgs.heli.height) {
                this.y = this.canvasHeight - window.imgs.heli.height;
            }
            if (KEY_STATUS.space && this.counter >= this.fireRate) {
                this.fire();
                this.counter = 0;
            }
            if (KEY_STATUS.ctrl && this.canFire) {
                this.column();
                this.canFire = false;
                this.score.fireImg = window.imgs.fireIconTr;
            }
        }
    }, {
        key: 'fire',
        value: function fire() {
            if (this.canBullet) {
                this.bullets.init(this.x + 40, this.y + 45, this.fireSpeed + this.score.score * 0.00008);
                this.sounds.play();
            }
        }
    }, {
        key: 'column',
        value: function column() {
            this.firer.init();
            // this.firer.height = 0;
        }
    }]);

    return Heli;
}(_Moving2.Moving);

var KEY_STATUS = {};
for (var code in KEY_CODES) {
    KEY_STATUS[KEY_CODES[code]] = false;
}

var KEY_CODES = {
    17: 'ctrl',
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

document.onkeydown = function (e) {

    var keyCode = e.keyCode ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = true;
    }
};

document.onkeyup = function (e) {
    var keyCode = e.keyCode ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = false;
    }
};
exports.Heli = Heli;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Monster = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Moving2 = __webpack_require__(1);

var _Animate = __webpack_require__(0);

var _enemyBullets = __webpack_require__(19);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Monster = function (_Moving) {
    _inherits(Monster, _Moving);

    function Monster(speed, score) {
        _classCallCheck(this, Monster);

        var _this = _possibleConstructorReturn(this, (Monster.__proto__ || Object.getPrototypeOf(Monster)).call(this));

        var options = {
            'img': window.imgs.monster,
            'pos': [720, _this.randomInteger(30, 350)],
            'size': [55, 45],
            'innerSize': [55, 45],
            'speedFrames': 5,
            'frames': [0, 1, 2, 3, 4, 5, 6, 7]
        };
        _this.animate = new _Animate.Animate(options);
        _this.alive = true;
        _this.score = score;
        _this.speed = speed;
        _this.enemyBullets = new _enemyBullets.enemyBullets(_this.score);
        _this.time = Date.now();
        return _this;
    }

    _createClass(Monster, [{
        key: 'move',
        value: function move() {
            this.animate.pos[0] -= this.speed + this.score.score * 0.00008;
            this.animate.update();
            this.animate.render(this.context);
            if (this.animate.pos[0] <= -55) {
                this.alive = false;
            }
        }
    }, {
        key: 'fire',
        value: function fire() {
            if (this.time + 1600 < Date.now()) {
                this.enemyBullets.init(this.animate.pos[0], this.animate.pos[1] + 25, 3.5);
                this.time = Date.now();
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.alive = false;
        }
    }]);

    return Monster;
}(_Moving2.Moving);

exports.Monster = Monster;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.enemyBullet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Moving2 = __webpack_require__(1);

var _Animate = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var enemyBullet = function (_Moving) {
	_inherits(enemyBullet, _Moving);

	function enemyBullet(score) {
		_classCallCheck(this, enemyBullet);

		var _this = _possibleConstructorReturn(this, (enemyBullet.__proto__ || Object.getPrototypeOf(enemyBullet)).call(this));

		_this.alive = true;
		_this.x = 0;
		_this.y = 0;
		_this.speed = 0;
		_this.options = {
			'img': window.imgs.enemyBullet,
			'pos': [_this.x, _this.y],
			'size': [33.5, 20],
			'innerSize': [33.5, 20],
			'speedFrames': 5,
			'frames': [0, 1, 2, 3]
		};
		_this.img = new _Animate.Animate(_this.options);
		_this.score = score;
		// this.img = window.imgs.rocket;
		return _this;
	}

	_createClass(enemyBullet, [{
		key: 'spawn',
		value: function spawn(x, y, speed) {
			this.x = x;
			this.y = y;
			this.speed = speed;
			this.alive = true;
		}

		/*
   * Uses a "drity rectangle" to erase the bullet and moves it.
   * Returns true if the bullet moved off the screen, indicating that
   * the bullet is ready to be cleared by the pool, otherwise draws
   * the bullet.
   */

	}, {
		key: 'draw',
		value: function draw() {
			this.x -= this.speed + this.score.score * 0.00008;
			this.options.pos[1] = this.y;
			this.options.pos[0] = this.x;
			this.img.update();
			this.img.render(this.context);
			if (this.x <= 0) {
				this.alive = false;
			}
		}

		/*
   * Resets the bullet values
   */

	}, {
		key: 'clear',
		value: function clear() {
			this.alive = false;
		}
	}]);

	return enemyBullet;
}(_Moving2.Moving);

exports.enemyBullet = enemyBullet;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var frequences = exports.frequences = {
    0: [[1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0]]
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gameInGame = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _frequences = __webpack_require__(31);

var _Coins = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gameInGame = function () {
    function gameInGame() {
        _classCallCheck(this, gameInGame);

        this.coins = [];
        this.options = {
            'pos': [720, 100],
            'size': [30, 30],
            'innerSize': [30, 30],
            'speedFrames': 3
        };
    }

    _createClass(gameInGame, [{
        key: 'init',
        value: function init() {
            var freq = _frequences.frequences[0];

            for (var i = 0; i < freq.length; i++) {
                for (var j = 0; j < freq[i].length; j++) {
                    if (freq[i][j]) {
                        this.coins.push(new _Coins.Coins(this.options));
                    }
                    if (j + 1 === freq[i].length) {
                        this.options.pos[0] = 720;
                    } else {
                        this.options.pos[0] += 30;
                    }
                }
                if (i + 1 === freq.length) {
                    this.options.pos[1] = 100;
                } else {
                    this.options.pos[1] += 30;
                }
            }
        }
    }, {
        key: 'animateCoins',
        value: function animateCoins() {
            if (this.coins.length > 0) {
                for (var i = 0; i < this.coins.length; i++) {
                    this.coins[i].moving(4);
                }
            }
        }
    }, {
        key: 'cleaner',
        value: function cleaner() {
            for (var i = 0; i < this.coins.length; i++) {
                if (!this.coins[i].alive) {
                    this.coins.splice(i, 1);
                }
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.coins = [];
        }
    }]);

    return gameInGame;
}();

exports.gameInGame = gameInGame;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
    function Timer(duration) {
        _classCallCheck(this, Timer);

        this.start = 0;
        this.time = 0;
        this.duration = 0;
        this.end = false;
    }

    _createClass(Timer, [{
        key: "init",
        value: function init(duration) {
            if (duration) this.duration = Date.now() + duration * 1000;
            this.start = this.time = Date.now();
        }
    }, {
        key: "tick",
        value: function tick() {
            this.time = Date.now();
            if (this.duration && this.time >= this.duration) this.end = true;
            return (this.time - this.start) / 1000;
        }
    }, {
        key: "check",
        value: function check() {
            if (this.end) {
                return true;
            }
            return false;
        }
    }, {
        key: "clear",
        value: function clear() {
            this.start = 0;
            this.time = 0;
            this.duration = 0;
            this.end = false;
        }
    }]);

    return Timer;
}();

exports.Timer = Timer;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BulletPool = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bullet = __webpack_require__(35);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Custom Pool object. Holds Bullet objects to be managed to prevent
 * garbage collection.
 */
var BulletPool = function () {
    function BulletPool() {
        _classCallCheck(this, BulletPool);

        this.pool = [];
    }

    /*
    * Populates the pool array with Bullet objects
    */


    _createClass(BulletPool, [{
        key: 'init',
        value: function init(x, y, speed) {
            // Initalize the bullet object
            var bullet = new _Bullet.Bullet();
            bullet.spawn(x, y, speed);
            this.pool.push(bullet);
        }
    }, {
        key: 'animate',


        /*
         * Draws any in use Bullets. If a bullet goes off the screen,
         * clears it and pushes it to the front of the array.
         */
        value: function animate() {
            for (var i = 0; i < this.pool.length; i++) {
                if (this.pool[i] && this.pool[i].alive) {
                    this.pool[i].draw();
                } else {
                    continue;
                }
            }
        }
    }, {
        key: 'cleaner',
        value: function cleaner() {
            for (var i = 0; i < this.pool.length; i++) {
                if (this.pool[i].alive === false) {
                    this.pool.splice(i, 1);
                }
            }
        }
    }]);

    return BulletPool;
}();

exports.BulletPool = BulletPool;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Bullet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Moving2 = __webpack_require__(1);

var _Animate = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Creates the Bullet object which the ship fires. The bullets are
 * drawn on the "main" canvas.
 */
var Bullet = function (_Moving) {
	_inherits(Bullet, _Moving);

	function Bullet() {
		_classCallCheck(this, Bullet);

		var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this));

		_this.alive = true;
		_this.x = 0;
		_this.y = 0;
		_this.speed = 0;
		_this.options = {
			'img': window.imgs.rocket,
			'pos': [_this.x, _this.y],
			'size': [84.5, 20],
			'innerSize': [84.5, 20],
			'speedFrames': 5,
			'frames': [0, 1, 2, 3]
		};
		_this.img = new _Animate.Animate(_this.options);
		// this.img = window.imgs.rocket;
		return _this;
	}

	_createClass(Bullet, [{
		key: 'spawn',
		value: function spawn(x, y, speed) {
			this.x = x;
			this.y = y;
			this.speed = speed;
			this.alive = true;
		}

		/*
   * Uses a "drity rectangle" to erase the bullet and moves it.
   * Returns true if the bullet moved off the screen, indicating that
   * the bullet is ready to be cleared by the pool, otherwise draws
   * the bullet.
   */

	}, {
		key: 'draw',
		value: function draw() {
			this.x += this.speed;
			this.options.pos[1] = this.y;
			this.options.pos[0] = this.x;
			this.img.update();
			this.img.render(this.context);
			if (this.x >= this.canvasWidth) {
				this.alive = false;
			}
		}

		/*
   * Resets the bullet values
   */

	}, {
		key: 'clear',
		value: function clear() {
			this.alive = false;
		}
	}]);

	return Bullet;
}(_Moving2.Moving);

exports.Bullet = Bullet;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map