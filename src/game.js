class Game {
	constructor(ctx, canvas) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.img = new Image();
		this.img.src = "../assets/sprite_bj90k9.png";

		this.height = this.ctx.canvas.height = window.innerHeight;
		this.width = this.ctx.canvas.width = window.innerWidth;

		//Game
		this.shots = [];

		this.playing = false;
		this.gameOver = false;

		//Player
		this.player = new Player();
		this.gameControl = (e) => this.controls(e);
		this.move = (e) => this.player.move(e, this.width, this.height);

		//Obstacles
		this.OBSTACLES = new Obstacles(this.ctx,this.img, this.width, this.height)
		this.obstacles = this.OBSTACLES.obstacles;
	}

	controls(e) {
		e.preventDefault();

		if (this.playing) {
			let shot = {
				x: -8,
				y: -3, //y: -179,
				sizeX: 2,
				sizeY: 10,
				realX: e.offsetX,
				realY: e.offsetY,
				dirX: e.offsetX,
				dirY: e.offsetY,
				deg: Math.atan2(
					e.offsetX - this.width / 2,
					-(e.offsetY - this.height / 2)
				),
				destroyed: false,
			};

			//console.log("adding shot");
			this.shots.push(shot);
		} else {
			let dist;
			if (this.gameOver) {
				dist = Math.sqrt(
					(e.offsetX - this.width / 2) * (e.offsetX - this.width / 2) +
						(e.offsetY - (this.height / 2 + 45 + 22)) *
							(e.offsetY - (this.height / 2 + 45 + 22))
				);
				if (dist < 27) {
					if (e.type == "click") {
						this.gameOver = false;
						this.shots = [];
						this.obstacles = [];
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
					(e.offsetX - this.width / 2) * (e.offsetX - this.width / 2) +
						(e.offsetY - this.height / 2) * (e.offsetY - this.height / 2)
				);

				if (dist < 27) {
					if (e.type == "click") {
						this.playing = true;
						this.canvas.removeEventListener("mousemove", this.gameControl);
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
	}

	start() {
		if (!this.gameOver) {
			//Clear
			this.ctx.clearRect(0, 0, this.width, this.height);
			this.ctx.beginPath();

			//Player
			this.player.draw(
				this.img,
				this.ctx,
				this.width,
				this.height,
				this.shots,
				this.obstacles,
				this.playing
			);

			if (this.playing) {
				this.OBSTACLES.generate_obstacles()
				//this.generate_obstacles();
			}
		}
	}
}

const random = (from, to) => {
	return Math.floor(Math.random() * (to - from + 1)) + from;
};
