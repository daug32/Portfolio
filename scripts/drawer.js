let canvas, body, canvasSize;
let mousePos, rotate;
let hyperCube;

function setup(){
	//Initialisation of settings and canvas
	body = document.getElementById("body");
	let W = body.clientWidth * 0.7;
	canvasSize = W < 550 ? W : 550;
	canvas = createCanvas(canvasSize, canvasSize);
	canvas.parent("canvasContainer");
	canvas.style("right", ((body.clientWidth - canvasSize) * 0.5).toString());

	//These variables are used for rotating the teseract
	mousePos = new Vector();
	rotate = new Vector();

	//Initilisation of hyperCube
	let size = 100;
	hyperCube = new Tesseract(
		new Vector(canvasSize / 2, canvasSize / 2, 150, 0), 
		new Vector(size, size, size, size)
	);
	//set default params for teseract
	hyperCube.XY = PI / 3;
	hyperCube.XZ = PI / 6;
	hyperCube.YZ = PI / 3;

	stroke(255);
	frameRate(58);
}
function draw(){
	let W = body.clientWidth * 0.7;
	canvasSize = W < 550 ? W : 550	
	if(width != canvasSize) {
		resizeCanvas(canvasSize, canvasSize);
		hyperCube.center.x = width / 2;
		hyperCube.center.y = height / 2;
		canvas.style("right", (body.clientWidth - 550) * 0.5);
	}

	//make the rotation dependence on the mouse position
	if(mouseIsPressed)
	{
		rotate.x = (mouseX - mousePos.x) * PI / 360;
		rotate.y = (mouseY - mousePos.y) * PI / 360;
		hyperCube.WX += rotate.x;
		hyperCube.WY += rotate.y;
	}
	mousePos.x = mouseX;
	mousePos.y = mouseY;

	background(25, 25, 25);

	let step = PI / 360; //0.5f degree
	//hyperCube.WZ += step;
	hyperCube.XZ += step;
	hyperCube.YZ += step;

	hyperCube.Calculate();
	hyperCube.Render();  
}