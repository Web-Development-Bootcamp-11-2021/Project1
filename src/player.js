class Player {
	constructor() {
		this.posX = -35;
		this.posY = -(100 + 82);
		this.width = 70;
		this.height = 79;
		this.deg = 0;
	}

	_player(img, ctx, cW, cH, bullets, asteroids, playing) {
		ctx.save();
		ctx.translate(cW / 2, cH / 2);

		ctx.rotate(this.deg);
		ctx.drawImage(
			img,
			200,
			0,
			this.width,
			this.height,
			this.posX,
			0,//this.posY,
			this.width,
			this.height
		);

		ctx.restore();

		if (bullets.length && playing) {
			this.fire(img, ctx, bullets, asteroids, cW, cH);
		}
	}

	move(e, cW, cH) {
		console.log(e)
		this.deg = Math.atan2(e.offsetX - cW / 2, -(e.offsetY - cH / 2));
	}

	fire(img, ctx, bullets, asteroids, cW, cH) {
		var distance;

		for (var i = 0; i < bullets.length; i++) {
			if (!bullets[i].destroyed) {
				ctx.save();
				ctx.translate(cW / 2, cH / 2);
				ctx.rotate(bullets[i].deg);

				ctx.drawImage(
					img,
					211,
					100,
					50,
					75,
					bullets[i].x,
					(bullets[i].y -= 20),
					19,
					30
				);

				ctx.restore();

				//Real coords
				bullets[i].realX = 0 - (bullets[i].y + 10) * Math.sin(bullets[i].deg);
				bullets[i].realY = 0 + (bullets[i].y + 10) * Math.cos(bullets[i].deg);

				bullets[i].realX += cW / 2;
				bullets[i].realY += cH / 2;

				//Collision
				for (var j = 0; j < asteroids.length; j++) {
					if (!asteroids[j].destroyed) {
						distance = Math.sqrt(
							Math.pow(asteroids[j].realX - bullets[i].realX, 2) +
								Math.pow(asteroids[j].realY - bullets[i].realY, 2)
						);

						if (
							distance <
							asteroids[j].width / asteroids[j].size / 2 - 4 + (19 / 2 - 4)
						) {
							//destroyed += 1;
							asteroids[j].destroyed = true;
							bullets[i].destroyed = true;
						}
					}
				}
			}
		}
	}
}
