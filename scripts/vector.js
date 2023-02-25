export class Vector {
	constructor(x = 0, y = 0, z = 0, w = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	Copy() {
		return new Vector(
			this.x,
			this.y, 
			this.z, 
			this.w
		);
	}

	CopyFrom(a) {
		this.x = a.x;
		this.y = a.y;
		this.z = a.z;
		this.w = a.w;
	}

	Multipy(a) {
		this.x *= a.x;
		this.y *= a.y;
		this.z *= a.z;
		this.w *= a.w;
	}

	Plus(a) {
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
		this.w += a.w;
	}

	Minus(a) {
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
		this.w -= a.w;
	}

	Length() {
		return this.x * this.x +
			this.y * this.y +
			this.z * this.z +
			this.w * this.w;
	}
}

export function Project3DPointTo2D(point, center) {
	let result = new Vector();
	result.CopyFrom(point)

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