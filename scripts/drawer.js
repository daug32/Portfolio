let canvas, body, parent, hyperCube;
let mousePos, rotate;

function setup(){
	//Initialisation of settings and canvas
	body = document.getElementsByTagName("body")[0];
	parent = document.getElementById("canvasContainer");
	canvas = createCanvas(parent.clientWidth, parent.clientHeight);
	canvas.parent("canvasContainer");

	//These variables are used for rotating the teseract
	mousePos = new Vector();
	rotate = new Vector();

	//Initilisation of hyperCube
	let size = 100;
	hyperCube = new Tesseract(
		new Vector(width / 2, height / 2, 150, 0), 
		new Vector(size, size, size, size)
	);
	//set default params for teseract
	hyperCube.XY = PI / 3;
	hyperCube.XZ = PI / 6;
	hyperCube.YZ = PI / 3;

	stroke(255, 255, 255, 120);
	frameRate(58);
}

function draw(){
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

	let step = PI / 360;
	//hyperCube.WZ += step;
	hyperCube.XZ += step;
	hyperCube.YZ += step;

	hyperCube.Calculate();
	hyperCube.Render();  
}