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
