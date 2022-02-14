class Vector {
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
}
Get(a){
  this.x = a.x;
  this.y = a.y;
  this.z = a.z;
  this.w = a.w;
}
Multipy(a){
  this.x *= a.x;
  this.y *= a.y;
  this.z *= a.z;
  this.w *= a.w;
}
Plus(a){
  this.x += a.x;
  this.y += a.y;
  this.z += a.z;
  this.w += a.w;
}
Minus(a){
  this.x -= a.x;
  this.y -= a.y;
  this.z -= a.z;
  this.w -= a.w;
}
Length(){
  return this.x * this.x + 
    this.y * this.y +
    this.z * this.z +
    this.w * this.w;
  }
}

function Projection3Dto2D(Point3D, center){
  //Position of the center of the screen;
  let coordCenter = new Vector(center.x, center.y);
  //Translate origin to the center of the screen;
  Point3D.Minus(coordCenter);
  //Calculate nearest position with the field of view equal to 90 degrees
  let near = min(height, width) / 2 / tan(PI / 4);

  Point3D.x = Point3D.x * near / Point3D.z;
  Point3D.y = Point3D.y * near / Point3D.z;

  //Translate back
  Point3D.Plus(coordCenter);
}