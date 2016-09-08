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
