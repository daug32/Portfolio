import { Tesseract } from "./Tesseract.js";
import { Vector } from "./Vector.js";

var canvasParent;
var canvas;

var tesseract;

export function setup() {
	// Init data
	canvasParent = document.getElementById("canvas__anchor");
	canvas = createCanvas(canvasParent.clientWidth, canvasParent.clientHeight);
	canvas.parent("canvas__anchor");

	window.onresize = () => {
		resizeCanvas(canvasParent.clientWidth, canvasParent.clientHeight);
		tesseract.setCenter(getCenter());
		background(10);
	}

	// Init objects
	let size = 100;
	tesseract = new Tesseract(getCenter(), new Vector(size, size, size, size));

	// Init view
	stroke(255);
	background(10);
	frameRate(50);
}

export function draw() {
	background(10, 10, 10, 80);

	let rotationStep = Math.PI / 360;
	let rotation = {
		// XY: rotationStep,
		// YZ: rotationStep,
		XZ: rotationStep,
		WX: rotationStep,
		WY: rotationStep,
		WZ: rotationStep,
	};
	
	tesseract.rotate(rotation);
	tesseract.render(height, width);
}

function getCenter() {
	return new Vector(width / 2, height / 2, 150, 0);
}