var B, CC;
var blw = 200, bw = 0;

function Tree(config) {
	B = this;
	config = config || {};
	// B.lw = B.w = 0;
	B.minW = 10;
	B.maxW = 80;
	B.minH = P.fireOffset;
	B.maxH = 400;
	B.minDist = 50;
	B.maxDist = 200;
	B.branchThickness = 3;

	CC.w = utils.pI(CC.width);
	CC.h = utils.pI(CC.height);

	B.color = '#a77b44';
	this.add();
	if (!config.isNoFlame) {
		B.flame = new Flame();
	}
	return B;
}

Tree.prototype = {
	/*drawFractalTree: function (x, y, width, height) {
		B.drawTree(x, y, width, height, -90, B.branchThickness);
	},
	drawTree: function (x1, y1, width, height, angle, depth){
		B.brLength = B.brLength || B.random(B.minW, B.maxW);
		B.angle = B.angle || B.random(15, 20);
		B.bb = (B.cos(angle) * depth * B.brLength);
		B.vv = (B.sin(angle) * depth * B.brLength);
		if (depth != 0){
			var x2 = x1 + B.bb;
			var y2 = y1 - B.vv;

			B.drawLine(x1, y1, x2, y2, depth);

			B.drawTree(x2, y2, width, height, angle - B.angle, depth - 1);
			B.drawTree(x2, y2, width, height, angle + B.angle, depth - 1);
			// B.drawLine(x1, y1, x2, y2, depth);
		}
	},
	random: function (min, max){
		return min + Math.floor(Math.random()*(max+1-min));
	},
	drawLine: function (x1, y1, x2, y2, thickness){
		ctx.fillStyle   = '#000';
		if(thickness > 2)
			ctx.strokeStyle = 'rgb(139,126, 102)'; //Brown
		else
			ctx.strokeStyle = 'rgb(34,139,34)'; //Green
		ctx.lineWidth = thickness * 1.5;
		bp();
		mt(x1, y1);
		lt(x2, y2);
		cp();
		st();

	},
	cos: function (angle) {
		return M.cos(B.deg_to_rad(angle));
	},
	sin: function (angle) {
		return M.sin(B.deg_to_rad(angle));
	},
	deg_to_rad: function (angle){
		return angle*(M.PI/180.0);
	},*/
	getWidth: function (val) {
		if (val !== undefined) {
			return val;
		}
		return utils.getRandomInt(B.minW, B.maxW);
	},
	getHeight: function (val) {
		if (val !== undefined) {
			return val;
		}
		return utils.getRandomInt(B.minH, B.maxH);
	},
	add: function (val) {
		B.preCompute();
		B.x = blw + bw;
		B.y = CC.h - B.h - (P.fireOffset / 2),
		B.width = bw,
		B.height = B.h;
		// B.drawFractalTree(B.x, B.y, B.width, B.height)

		B.update(B.x, B.y, B.width, B.height);
		return B;
	},
	update: function (x, y, width, height) {
		sv();
		fs(B.color);

		bp();
		mt(x, y);
		// left side
		bct(x , y + height, x - 25, y + height, x - 25, y + height);

		// left bottom curve
		bct(x, y + height, x + (width / 2), y + height / 1.2, x + (width / 2), y + (height / 1.2))
		// right bottom curve
		bct(x + (width / 2), y + (height / 1.2), x + (width / 2), y + height / 1.2, x + width + 25, y + height);

		// right side
		bct(x + width, y + height, x + width, y, x + width, y);

		ctx.shadowColor   = '#6b4e2a';
        ctx.shadowOffsetX = -3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur    = 10;
		ctx.strokeStyle = '#6b4e2a';
		ctx.lineWidth = 1;
		st();
		cp();
		fl();
		rs();

		fs('#6b4e2a')
		el(ctx, x, y - 4, width, 10, '#6b4e2a');
	},
	preCompute: function () {
		B.lw = blw + bw + (bw === 0 ? 0 : utils.getRandomInt(B.minDist, B.maxDist));
		blw = B.lw;
		B.w = utils.getRandomInt(B.minW, B.maxW);
		bw = B.w;
		B.h = utils.getRandomInt(B.minH, B.maxH);
		// console.log(blw, bw)
		// B.rw = CC.w - B.lw - B.w;
	},
	removeFlame: function (that) {
		that.flame = null;
	}
};

