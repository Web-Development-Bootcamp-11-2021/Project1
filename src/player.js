class Player {
	constructor() {
		this.posX = -35;
		this.posY = -(100 + 82);
		this.width = 70;
		this.height = 79;
		this.deg = 0;
	}

	draw(img, ctx, width, height, bullets, obstacles, playing) {
		ctx.save();
		ctx.translate(width / 2, height / 2); // Center image 50% 50%

		ctx.rotate(this.deg); 
		ctx.drawImage(
			img,
			200,
			0,
			this.width,
			this.height,
			this.posX,
			0,//this.posY, //0
			this.width,
			this.height
		);

		ctx.restore();

		if (bullets.length && playing) {
			this.shoot(img, ctx, bullets, obstacles, width, height);
		}
	}

	move(e, width, height) {
		/* formula of the angle considering hor x, y traslated above =>
		 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2 */
		this.deg = Math.atan2(e.offsetX - width / 2, -(e.offsetY - height / 2));

	}

	shoot(img, ctx, bullets, obstacles, width, height) {
		var distance;

		for (var i = 0; i < bullets.length; i++) {
			if (!bullets[i].destroyed) {
				ctx.save();
				ctx.translate(width / 2, height / 2);
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

				bullets[i].realX += width / 2;
				bullets[i].realY += height / 2;

				//Collision
				for (var j = 0; j < obstacles.length; j++) {
					if (!obstacles[j].destroyed) {
						distance = Math.sqrt(
							Math.pow(obstacles[j].realX - bullets[i].realX, 2) +
								Math.pow(obstacles[j].realY - bullets[i].realY, 2)
						);

						if (
							distance <
							obstacles[j].width / obstacles[j].size / 2 - 4 + (19 / 2 - 4)
						) {
							//destroyed += 1;
							obstacles[j].destroyed = true;
							bullets[i].destroyed = true;
						}
					}
				}
			}
		}
	}
}
