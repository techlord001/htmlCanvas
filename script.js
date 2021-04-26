const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d'); // set canvas to 2D

// Have canvas fill entire window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 30;
// ctx.globalCompositeOperation = 'luminosity';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
	if (!isDrawing) return;

	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	
	[lastX, lastY] = [e.offsetX, e.offsetY]; // adjust for different starting points

	// Variable line colour
	hue++;
	if (hue >= 360) {
		hue = 0;
	}

	// Variable line width
	if (ctx.lineWidth >= 30 || ctx.lineWidth <= 10) {
		direction = !direction;
	}

	if (direction) {
		ctx.lineWidth += 0.1;
	} else {
		ctx.lineWidth -= 0.1;
	}
}

// adjust for different starting points
canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false); // stops drawing when mouse click ends
canvas.addEventListener('mouseout', () => isDrawing = false); // stops drawing when mouse outside of window
