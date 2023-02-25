import { Vector } from "./Vector.js";

export function Project3DPointTo2D(point, center, height, width) {
	let result = point.Copy();

	//Position of the center of the screen;
	let coordCenter = new Vector(center.x, center.y);

	//Translate origin to the center of the screen;
	result.Minus(coordCenter);

	//Calculate nearest position with the field of view equal to 90 degrees
	let near = min(height, width) / 2 / tan(PI / 4);
	result.x = result.x * near / result.z;
	result.y = result.y * near / result.z;

	//Translate back
	result.Plus(coordCenter);

	return result;
}