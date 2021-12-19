class Asteroids_constelation {
	constructor(ctx, canvas, sprite, cW, cH, destroyed, gameOver, playing, action) {
		this.asteroids = [];
		this.ctx = ctx;
		this.canvas = canvas;
		this.gameOver = gameOver;
		this.playing = playing;
		this.sprite = sprite;
		this.cW = cW;
		this.cH = cH;
		this.destroyed = destroyed;
		this.action = action;
	}

	_asteroids() {
		console.log(this.asteroids)
		let distance;

		for (let i = 0; i < this.asteroids.length; i++) {
			if (!this.asteroids[i].destroyed) {
				this.ctx.save();
				this.ctx.translate(
					this.asteroids[i].coordsX,
					this.asteroids[i].coordsY
				);
				this.ctx.rotate(this.asteroids[i].deg);

				this.ctx.drawImage(
					this.sprite,
					this.asteroids[i].x,
					this.asteroids[i].y,
					this.asteroids[i].width,
					this.asteroids[i].height,
					-(this.asteroids[i].width / this.asteroids[i].size) / 2,
					(this.asteroids[i].moveY += 1 / this.asteroids[i].size),
					this.asteroids[i].width / this.asteroids[i].size,
					this.asteroids[i].height / this.asteroids[i].size
				);

				this.ctx.restore();

				//Real Coords
				this.asteroids[i].realX =
					0 -
					(this.asteroids[i].moveY +
						this.asteroids[i].height / this.asteroids[i].size / 2) *
						Math.sin(this.asteroids[i].deg);
				this.asteroids[i].realY =
					0 +
					(this.asteroids[i].moveY +
						this.asteroids[i].height / this.asteroids[i].size / 2) *
						Math.cos(this.asteroids[i].deg);

				this.asteroids[i].realX += this.asteroids[i].coordsX;
				this.asteroids[i].realY += this.asteroids[i].coordsY;

				//Game over
				/* distance = Math.sqrt(
					Math.pow(this.asteroids[i].realX - this.cW / 2, 2) +
						Math.pow(this.asteroids[i].realY - this.cH / 2, 2)
				);
				if (
					distance <
					this.asteroids[i].width / this.asteroids[i].size / 2 - 4 + 100
				) {
					this.gameOver = true;
					this.playing = false;
					this.canvas.addEventListener("mousemove", this.action);
				} */
			}
		}

		if (
			this.asteroids.length - this.destroyed <
			10 + Math.floor(this.destroyed / 6)
		) {
			this.newAsteroid();
		}
	}

	newAsteroid() {
		let type = this.random(1, 4),
			coordsX,
			coordsY;

		switch (type) {
			case 1:
				coordsX = this.random(0, this.cW);
				coordsY = 0 - 150;
				break;
			case 2:
				coordsX = this.cW + 150;
				coordsY = this.random(0, this.cH);
				break;
			case 3:
				coordsX = this.random(0, this.cW);
				coordsY = this.cH + 150;
				break;
			case 4:
				coordsX = 0 - 150;
				coordsY = this.random(0, this.cH);
				break;
		}

		let asteroid = {
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
			deg: Math.atan2(coordsX - this.cW / 2, -(coordsY - this.cH / 2)),
			destroyed: false,
		};

		console.log("adding asteroid");
		this.asteroids.push(asteroid);
	}

	random(from, to) {
		return Math.floor(Math.random() * (to - from + 1)) + from;
	}
}
