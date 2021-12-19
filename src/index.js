window.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("game");
	const ctx = canvas.getContext("2d");

	const game = new Game(ctx, canvas);

	// game.setupEventListeners()
	canvas.addEventListener("click", (e) => game.setup(e));
	canvas.addEventListener("mousemove", (e) => game.setup(e));

	window.addEventListener("resize", (e) => game.resize(e));

	const init = () => {
		window.requestAnimationFrame(init);
		game.start();
	};

	init();
});
