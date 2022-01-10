window.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const start = document.getElementById("start")

	const game = new Game(ctx, canvas);

	const init = () => {
		window.requestAnimationFrame(init);
		game.start();
	};

	canvas.addEventListener("click", game.gameControl);
	canvas.addEventListener("mousemove", game.gameControl);


	init();
});
