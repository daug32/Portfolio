let canvas, body, parent, hyperCube;
let mousePos, rotate;
let oneDegree;

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

	oneDegree = PI / 180;

	stroke(255, 255, 255, 120);
	frameRate(50);
}

function draw(){
	//make the rotation dependence on the mouse position
	if(mouseIsPressed)
	{
		rotate.x = map((mouseX - mousePos.x), 0, width, 0, PI);
		rotate.y = map((mouseY - mousePos.y), 0, width, 0, PI);
		hyperCube.WX += rotate.x;
		hyperCube.WY += rotate.y;
	}
	mousePos.x = mouseX;
	mousePos.y = mouseY;
	
	hyperCube.XZ += oneDegree;
	hyperCube.YZ += oneDegree;

	//we don't need rendering, if we don't see 
	if(parent.getBoundingClientRect().bottom < 0)
		return;

	background(25, 25, 25);

	hyperCube.Calculate();
	hyperCube.Render();  
}