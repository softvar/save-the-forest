var CC, RN, WD, SM, cloud, sunMoon, wind, rain, currentTime;
var diffInWeatherTime = 10;
function Cloud() {
	this.color = 'blue';
	this.x = G.can.width || P.w;
	this.y = 100;
	this.speed = 7;
	this.update();
}
Cloud.prototype = {
	update: function () {
		this.x -= this.speed;
		if (this.x + 250 < 0) {
			this.x = CC.w;
			this.y = this.y + utils.getRandomInt(-10, 10);
		}

		var cloudColor = thisWeather.hexToRgb(thisWeather.getColor(), 0.5);

		sv();
		bp();
		fs(cloudColor)
		mt(this.x, this.y);
		bct(this.x - 40, this.y + 20, this.x - 40, this.y + 70, this.x + 60, this.y + 70);
		bct(this.x + 80, this.y + 100, this.x + 150, this.y + 100, this.x + 170, this.y + 70);
		bct(this.x + 250, this.y + 70, this.x + 250, this.y + 40, this.x + 220, this.y + 20);
		bct(this.x + 260, this.y - 40, this.x + 200, this.y - 50, this.x + 170, this.y - 30);
		bct(this.x + 150, this.y - 75, this.x + 80, this.y - 60, this.x + 80, this.y - 30);
		bct(this.x + 30, this.y - 75, this.x - 20, this.y - 60, this.x, this.y);
		cp();

		ctx.shadowColor   = thisWeather.hexToRgb(thisWeather.getColor(), 0.8);
        ctx.shadowOffsetX = -3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur    = 10;
		ctx.lineWidth = 3;
		sts(thisWeather.hexToRgb(thisWeather.getColor(), 0.8))
		st();
		fl();
		rs();

		bp();
		mt(this.x + 150, this.y - 15); // 188, 50
		qct(
			this.x + 150 + 50,
			this.y - 15 + 0,
			this.x + 150 + 40,
			this.y - 15 + 40
		);
		ctx.lineWidth = 4;
		sts(thisWeather.hexToRgb(thisWeather.getColor(), 0.8))
		st();

		bp();
		mt(this.x + 20 + 30, this.y + 10); // 188, 50
		qct(
			this.x + 30,
			this.y + 35 + 10,
			this.x + 30 + 60,
			this.y + 35 + 15
		);
		st();
	}
}

function SunMoon() {
	SM = this;
	this.isSun = true; // will act as moon too
	this.r = 20;
	this.x = 0;
	this.y = 100;
	this.speed = 1;
	G.period = 'morning';
	this.update();
}
SunMoon.prototype = {
	getColor: function () {
		var color;
		switch (G.period) {
			case 'morning':
				color = this.isSun ? '#ffff9e' : '#fff';
				break;
			case 'afternoon':
				color = this.isSun ? 'orange' : '#fff';
				break;
			case 'evening':
				color = this.isSun ? 'red' : '#fff';
				break;
			case 'night':
				color = this.isSun ? '#fff' : '#fff';
				break;
		}
		return color;
	},
	resetPos: function () {
		this.x = 0;
		this.y = 100;
		G.period = 'morning';
		thisWeather.step = 0;
		currentTime = new Date();
	},
	update: function () {
		// lets assume 30 secs is 1 day, so 15-15 secs day-night
		if (Weather.dt / 1000 > 5 * diffInWeatherTime ||
			Weather.dt / 1000 > 4 * diffInWeatherTime ||
			Weather.dt / 1000 > 3 * diffInWeatherTime
		) {
			G.period = 'night';
		} else if (Weather.dt / 1000 > 2 * diffInWeatherTime) {
			G.period = 'evening';
		} else if (Weather.dt / 1000 > 1 * diffInWeatherTime) {
			G.period = 'afternoon';
		} else {
			G.period = 'morning';
		}

		this.x += ((G.can.width / (2 * diffInWeatherTime)) / fps); // this.speed;
		if (this.x > G.can.width) {
			this.resetPos();
			this.isSun = !this.isSun;
			return;
		}

		this.y -= 0.1;
		sv();
		ctx.shadowColor   = this.getColor();
        ctx.shadowOffsetX = -3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur    = 10;
		bp();
		ar(this.x, this.y, this.r, 0, Math.PI * 2, true);
		cp();
		ctx.fillStyle = this.getColor();
		fl();
		rs();

		thisWeather.updateGradient();
		//G.backgroundColor = this.isSun ? this.getColor(true) : '#555';
	}
}
