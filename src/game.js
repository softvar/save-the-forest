var G, ctx, CC, background, player, weather;
function Game() {
	G = this;
	G.isInProgress = true;
	G.backgroundColor = '#fff';

	G.highscore = utils.getLocalStorageData() || 0;
	G.isSound = utils.getLocalStorageData() || 1;

	G.resolution = 1;
	G.curPos = [];

	G.can = document.querySelector('canvas');
	G.can.width = P.w;
	G.can.height = P.h;

	ctx = G.ctx = window.c = G.can.getContext('2d');

	G.buildings = [];

	// Resizing
	G.resize();
	addEventListener('resize', G.resize, false);

	CC = document.getElementById('canvascontainer').style;

	document.body.addEventListener('touc'+'hstart', G.touchStart.bind(G), false);
	document.body.addEventListener('touc'+'hmove', G.touchMove.bind(G), false);
	document.body.addEventListener('touc'+'hend', G.touchEnd.bind(G), false);
	document.body.addEventListener('mous'+'edown', G.mouseDown.bind(G), false);
	document.body.addEventListener('mous'+'emove', G.mouseMove.bind(G), false);
	document.body.addEventListener('mous'+'eup', G.mouseUp.bind(G), false);

	document.body.addEventListener('keydown', G.keyDown.bind(G), false);
	document.body.addEventListener('keyup', G.keyUp.bind(G), false);

	// Loop
	G.frameCount = 0;
	G.lastFrame = G.frameCountStart = Date.now();

	G.raf = raf(function(){
		if (G.raf) {
			G.cycle();
			raf(arguments.callee);
		}
	});

	var displayablePixels = _.innerWidth * _.innerHeight * _.devicePixelRatio,
		gamePixels = P.w * P.h,
		ratio = displayablePixels / gamePixels;

	if (ratio < 0.5){
		G.setResolution(ratio * 2);
	}

	G.speed = 1;

	// background animation
	//background = new Background();
	flameBack.canvas = G.can;
	flameBack.init();

	weather = new Weather();
}

var tree, time;
Game.prototype = {
	restart: function () {
		//background = new Background();
		flameBack.init();
		weather = new Weather();
		G.buildings = [];
		blw = 200;

		G.addInitialBuildings();
		player = new Player();

		G.raf = raf(function(){
			if (G.raf) {
				G.cycle();
				raf(arguments.callee);
			}
		});
	},
	stopCycle: function () {
		_.cancelAnimationFrame(G.raf);
   		G.raf = undefined;
   		G.isInProgress = false;
   		console.log('Boom! DIE!')
   		SU.play('gameOver');
	},
	cycle: function () {
		var now = new Date().getTime();
		dt = now - time;

		if (dt < (1000 / fps))
			return; // skip a frame

		//SU.play('game');
		time = now;

		fs(G.backgroundColor);
		fr(0, 0, CC.w, CC.h)

		//background.burnBurnBurn();
		weather.update();

		if (G.buildings.length) {

			for (var i = 0; i < G.buildings.length; i++) {
				G.buildings[i].x -= G.speed;
				G.buildings[i].update(G.buildings[i].x, G.buildings[i].y, G.buildings[i].width, G.buildings[i].height);

				// G.buildings[i].drawFractalTree(G.buildings[i].x, G.buildings[i].y, G.buildings[i].width, G.buildings[i].height)

				//G.buildings[i].flame.size = G.buildings[i].width / 2;
				G.buildings[i].flame && G.buildings[i].flame.update(G.buildings[i].x, G.buildings[i].y, G.buildings[i].width);

				if (G.buildings[i].x < 0 - G.buildings[i].width) {
					G.buildings[i] = new Tree();
				}
			}
			player.update();

			if (G.buildings.length === 10) {
				// G.buildings.splice(0, 5);
			}
		}
		flameBack.update();
	},
	addInitialBuildings: function () {
		G.buildings.push(new Tree({isNoFlame: true}))
		for (var i = 0; i < 20; i++) {
			G.buildings.push(new Tree())
		}
	},
	resize: function() {
		setTimeout(function(){
			var maxWidth = innerWidth,
				maxHeight = innerHeight,

				availableRatio = maxWidth / maxHeight,
				baseRatio = P.w / P.h,
				ratioDifference = abs(availableRatio - baseRatio),
				width,
				height,
				s = document.getElementById('canvascontainer').style;

			if (availableRatio <= baseRatio){
				width = maxWidth;
				height = width / baseRatio;
			} else{
				height = maxHeight;
				width = height * baseRatio;
			}

			s.width = width + 'px';
			s.height = height + 'px';

			ctx.globalCompositeOperation="lighter";

			G.can.width = width;
			G.can.height = height;

			G.addInitialBuildings();
			player = new Player();

		},100);
	},
	pos : function(e){
		var rect = G.can.getBoundingClientRect(),
			pos = [];

		e = e.touches || [e];

		for(var i = 0 ; i < e.length ; i++){
			pos.push({
				x : (e[i].clientX - rect.left) / (rect.width / P.w),
				y : (e[i].clientY - rect.top) / (rect.height / P.h)
			})
		}

		return pos;
	},
	touchStart : function(e,m) {
		e.preventDefault();
		G.touch = G.touch || !m;
		var p = G.pos(e);
		G.curPos = p;

		scrollTo(0, 1);

		if(!G.isInProgress) return;

		//G.world.touchStart();
	},
	touchMove : function(e) {
		e.preventDefault();
		if (G.curPos){
			G.curPos = G.pos(e);

			if(!G.isInProgress) return;
			//G.world.touchMove();
		}
	},
	touchEnd : function(e) {
		e.preventDefault();

		var p = G.curPos[0];
		G.curPos = G.pos(e);

		if (!G.isInProgress) {
			//!G.isInProgress.click(p.x, p.y);
		} else {
			//G.world.touchEnd();
		}
	},
	keyDown: function(e) {
		// 32 is space
		if (e.keyCode === 32 && !G.isInProgress) {
			G.restart();
			return;
		}
		if (!G.isInProgress) {
			return;
		}

		// 39 is right, 40 is down, 38 is up
		if (e.keyCode === 39 || e.keyCode === 38) {
			player.keyDown(e.keyCode);
		}
	},
	keyUp: function(e) {
		if(!G.isInProgress) return;
		player.keyUp(e.keyCode);
	},
	mouseDown: function(e) {
		if(!G.touch){
			G.touchStart(e, true);
		}
	},
	mouseMove: function(e) {
		if(!G.touch){
			G.touchMove(e);
		}
	},
	mouseUp: function(e) {
		if(!G.touch){
			G.touchEnd(e);
		}
	},
	setResolution: function(r) {
		G.can.width = P.w * r;
		G.can.height = P.h * r;

		G.resolution = r;
	}
}