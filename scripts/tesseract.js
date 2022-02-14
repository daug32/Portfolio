class Tesseract{
	constructor(center, scale){
		//Rotation in radians
		//==========================
		this.XY = 0;
		this.XZ = 0;
		this.YZ = 0;
		this.WX = 0;
		this.WY = 0;
		this.WZ = 0;
		//==========================
		this.numOfIteration = 0;

		this.center = center;
		this.scale = scale;

		this.baseVertices = [
			new Vector(0, 0, 0, 0),
			new Vector(0, 1, 0, 0),
			new Vector(1, 1, 0, 0),
			new Vector(1, 0, 0, 0),

			new Vector(0, 0, 1, 0),
			new Vector(0, 1, 1, 0),
			new Vector(1, 1, 1, 0),
			new Vector(1, 0, 1, 0),

			new Vector(0, 0, 0, 1),
			new Vector(0, 1, 0, 1),
			new Vector(1, 1, 0, 1),
			new Vector(1, 0, 0, 1),

			new Vector(0, 0, 1, 1),
			new Vector(0, 1, 1, 1),
			new Vector(1, 1, 1, 1),
			new Vector(1, 0, 1, 1)
		];

		for(var i = 0; i < 16; i++) 
		{
			this.baseVertices[i].x -= 0.5;
			this.baseVertices[i].y -= 0.5;
			this.baseVertices[i].z -= 0.5;
			this.baseVertices[i].w -= 0.5;
		}

		this.drawableVertices = new Array(16);
		for(let i = 0; i < 16; i++) this.drawableVertices[i] = new Vector();
	}

	Render(){
		//Vectors are used for:
		//making names of vertices smaller,
		//copying values from vertices
		//and saving stored data in vertices
		let a = new Vector();
		let b = new Vector();
		let c = new Vector();

		for(var i = 0; i < 16; i++)
		{
			a.Get(this.baseVertices[i]);

			//I don't know, how to fix it
			//Not all vertices gets circles without
			//expression down here
			for(var j = (i < 1 ? 0 : i - 1); j < 16; j++)
			{
				b.Get(this.baseVertices[j]);
				b.Minus(a);
				if(abs(b.Length() - 1) < 0.01) 
				{
					//Get values from saved vertex
					c.Get(this.drawableVertices[i]);
					b.Get(this.drawableVertices[j]);

					//Make projection to the screen plane 
					Projection3Dto2D(c, this.center);
					Projection3Dto2D(b, this.center);

					line(c.x, c.y, b.x, b.y);
				}
			}
			circle(c.x, c.y, 10);
		}
		this.numOfIteration++;
	}	
	Calculate() {
	    let a = new Vector();
	    let b = new Vector();
	    
	    for(var i = 0; i < 16; i++){
	      //Get value
	      a.Get(this.baseVertices[i]);
	      
	      //Rotation actions
	      //==========================

		  //x y z w
		  //xy xz xw yz yw zw

	      //for XY
	      b.Get(a);
	      a.x = b.x * cos(this.XY) - b.y * sin(this.XY);
	      a.y = b.x * sin(this.XY) + b.y * cos(this.XY);
	      //for XZ
	      b.Get(a);
	      a.x = b.x * cos(this.XZ) + b.z * sin(this.XZ);
	      a.z = b.x * (-sin(this.XZ)) + b.z * cos(this.XZ);
	      //for WX
	      b.Get(a);
	      a.x = b.x * cos(this.WX) + b.w * sin(this.WX);
	      a.w = b.x * (-sin(this.WX)) + b.w * cos(this.WX);
	      //for YZ
	      b.Get(a);
	      a.y = b.y * cos(this.YZ) - b.z * sin(this.YZ);
	      a.z = b.y * sin(this.YZ) + b.z * cos(this.YZ);
	      //for WY
	      b.Get(a);
	      a.y = b.y * cos(this.WY) + b.w * sin(this.WY);
	      a.w = b.y * (-sin(this.WY)) + b.w * cos(this.WY);
	      //for WZ
	      b.Get(a);
	      a.z = b.z * cos(this.WZ) - b.w * sin(this.WZ);
	      a.w = b.z * sin(this.WZ) + b.w * cos(this.WZ);
	      //==========================
	      
	      //Scaling
	      //==========================
	      a.Multipy(this.scale);      
	      //==========================
	      
	      //Translating
	      //==========================
	      a.Plus(this.center);      
	      //==========================
	      
	      this.drawableVertices[i].Get(a);
	    }
	}
}