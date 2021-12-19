class Game {
	constructor(ctx, canvas) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.img = new Image();
		this.img.src = "../assets/sprite_bj90k9.png";

		this.cH = this.ctx.canvas.height = window.innerHeight;
		this.cW = this.ctx.canvas.width = window.innerWidth;

		//Game
		this.bullets = [];
		this.asteroids = [];
		//this.destroyed = 0;
		this.playing = false;
		this.gameOver = false;

		//Player

		this.player = new Player(); 

		this.action = (e) => {
			e.preventDefault();

			if (this.playing) {
				let bullet = {
					x: -8,
					y: -3,//y: -179,
					sizeX: 2,
					sizeY: 10,
					realX: e.offsetX,
					realY: e.offsetY,
					dirX: e.offsetX,
					dirY: e.offsetY,
					deg: Math.atan2(e.offsetX - this.cW / 2, -(e.offsetY - this.cH / 2)),
					destroyed: false,
				};

				//console.log("adding bullet");
				this.bullets.push(bullet);
			} else {
				let dist;
				if (this.gameOver) {
					dist = Math.sqrt(
						(e.offsetX - this.cW / 2) * (e.offsetX - this.cW / 2) +
							(e.offsetY - (this.cH / 2 + 45 + 22)) *
								(e.offsetY - (this.cH / 2 + 45 + 22))
					);
					if (dist < 27) {
						if (e.type == "click") {
							this.gameOver = false;
							this.count = 0;
							this.bullets = [];
							this.asteroids = [];
							//this.destroyed = 0;
							this.player.deg = 0;
							this.canvas.removeEventListener("mousemove", this.move);
							this.canvas.style.cursor = "default";
						} else {
							this.canvas.style.cursor = "pointer";
						}
					} else {
						this.canvas.style.cursor = "default";
					}
				} else {
					dist = Math.sqrt(
						(e.offsetX - this.cW / 2) * (e.offsetX - this.cW / 2) +
							(e.offsetY - this.cH / 2) * (e.offsetY - this.cH / 2)
					);

					if (dist < 27) {
						if (e.type == "click") {
							this.playing = true;
							this.canvas.removeEventListener("mousemove", this.action);
							this.canvas.addEventListener("mousemove", this.move);
							this.canvas.style.cursor = "default";
						} else {
							this.canvas.style.cursor = "pointer";
						}
					} else {
						this.canvas.style.cursor = "default";
					}
				}
			}
		};

		this.move = (e) => this.player.move(e, this.cW, this.cH);

	}

	update() {
		this.cH = this.ctx.canvas.height = window.innerHeight;
		this.cW = this.ctx.canvas.width = window.innerWidth;
	}

	newAsteroid() {
		let type = random(1, 4),
			coordsX,
			coordsY;

		switch (type) {
			case 1:
				coordsX = random(0, this.cW);
				coordsY = 0 - 150;
				break;
			case 2:
				coordsX = this.cW + 150;
				coordsY = random(0, this.cH);
				break;
			case 3:
				coordsX = random(0, this.cW);
				coordsY = this.cH + 150;
				break;
			case 4:
				coordsX = 0 - 150;
				coordsY = random(0, this.cH);
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
			size: random(1, 3),
			deg: Math.atan2(coordsX - this.cW / 2, -(coordsY - this.cH / 2)),
			destroyed: false,
		};

		//console.log("adding asteroid");
		this.asteroids.push(asteroid);
	}

	_asteroids() {
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
					this.img,
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
			this.asteroids.length < 10
		) {
			this.newAsteroid();
		}
	}

	start() {
		if (!this.gameOver) {
			//Clear
			this.ctx.clearRect(0, 0, this.cW, this.cH);
			this.ctx.beginPath();

			//Player
			this.player._player(
				this.img,
				this.ctx,
				this.cW,
				this.cH,
				this.bullets,
				this.asteroids,
				//this.destroyed,
				this.playing
			);

			if (this.playing) {
				this._asteroids();

			} else {
				// draws Start buttom
				this.ctx.drawImage(
					this.img,
					428,
					12,
					70,
					70,
					this.cW / 2 - 35,
					this.cH / 2 - 35,
					70,
					70
				);
			}
		}
	}
}

const random = (from, to) => {
	return Math.floor(Math.random() * (to - from + 1)) + from;
};

window.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");

	const game = new Game(ctx, canvas);

	const init = () => {
		window.requestAnimationFrame(init);
		game.start();
	};

	canvas.addEventListener("click", game.action);
	canvas.addEventListener("mousemove", game.action);
	window.addEventListener("resize", game.update);

	init();
});
