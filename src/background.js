class Background {
	constructor(ctx) {
		this.ctx = ctx;

		this.y = 0;
		this.vy = 3;

		this.width = this.ctx.canvas.width;
		this.height = this.ctx.canvas.height;

		this.img = new Image();
		this.img.src = "assets/spacebg.jpg";
		this.img.isReady = false;

		this.img.onload = () => {
			this.img.isReady = true;
		};
	}

	draw() {
		if (this.img.isReady) {
			this.ctx.drawImage(
				this.img,
				0,
				this.y,
				this.width,
				this.height
			);

			this.ctx.drawImage(
				this.img,
				0,
				this.y - this.height,
				this.width,
				this.height
			);

			this.y += this.vy;

			if (this.y >= this.height) {
				this.y = 0
			}

			/* if (this.y + this.height <= 0) {
				this.y = 0;
			} */
		}
	}

	/* move() {
		this.x += this.vx;

		if (this.x + this.width <= 0) {
			this.x = 0;
		}
	} */
}
