class Obstacles {
	constructor(ctx, img, width, height) {
		this.obstacles = [];
		this.ctx = ctx;
		this.img = img;
		this.width = width;
		this.height = height;
		this.collided = false;
	}

	generate_obstacles() {
		let distance;
		for (let i = 0; i < this.obstacles.length; i++) {
			if (!this.obstacles[i].destroyed) {
				this.ctx.save();
				this.ctx.translate(
					this.obstacles[i].coordsX,
					this.obstacles[i].coordsY
				);
				this.ctx.rotate(this.obstacles[i].deg);

				this.ctx.drawImage(
					this.img,
					this.obstacles[i].x,
					this.obstacles[i].y,
					this.obstacles[i].width,
					this.obstacles[i].height,
					-(this.obstacles[i].width / this.obstacles[i].size) / 2,
					(this.obstacles[i].moveY += 1 / this.obstacles[i].size),
					this.obstacles[i].width / this.obstacles[i].size,
					this.obstacles[i].height / this.obstacles[i].size
				);

				this.ctx.restore();

				//Real Coords
				this.obstacles[i].realX =
					0 -
					(this.obstacles[i].moveY +
						this.obstacles[i].height / this.obstacles[i].size / 2) *
						Math.sin(this.obstacles[i].deg);
				this.obstacles[i].realY =
					0 +
					(this.obstacles[i].moveY +
						this.obstacles[i].height / this.obstacles[i].size / 2) *
						Math.cos(this.obstacles[i].deg);

				this.obstacles[i].realX += this.obstacles[i].coordsX;
				this.obstacles[i].realY += this.obstacles[i].coordsY;

				//Game over
				distance = Math.sqrt(Math.pow(this.obstacles[i].realX -  this.width/2, 2) + Math.pow(this.obstacles[i].realY - this.height/2, 2));
				if (distance < (((this.obstacles[i].width / this.obstacles[i].size) / 2) - 4) + 100) {

						this.collided = true
						/* gameOver = true;
						playing  = false;
						canvas.addEventListener('mousemove', controls); */
				}
			}
		}

		if (this.obstacles.length < 15) {
			this.create_obstacle();
		}

		return this.obstacles;
	}

	create_obstacle() {
		let type = this.random(1, 4);
		let coordsX;
		let coordsY;

		if (type == 1) {
			coordsX = this.random(0, this.width);
			coordsY = 0 - 150;
		}
		if (type == 2) {
			coordsX = this.width + 150;
			coordsY = this.random(0, this.height);
		}
		if (type == 3) {
			coordsX = this.random(0, this.width);
			coordsY = this.height + 150;
		}
		if (type == 4) {
			coordsX = 0 - 150;
			coordsY = this.random(0, this.height);
		}

		let obstacle = {
			x: 278,
			y: 0,
			state: 0,
			stateX: 0,
			width: 134,
			height: 123,
			realX: coordsX,
			realY: coordsY,
			moveY: 0,
			coordsX: coordsX,
			coordsY: coordsY,
			size: this.random(1, 3),
			deg: Math.atan2(coordsX - this.width / 2, -(coordsY - this.height / 2)),
			destroyed: false,
		};

		this.obstacles.push(obstacle);
	}

	random(from, to) {
		return Math.floor(Math.random() * (to - from + 1)) + from;
	}
}
