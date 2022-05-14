import { Vector } from "/scripts/Vector.js";
import { Tesseract } from "/scripts/Tesseract.js";

let canvas, body, parent, hyperCube;
let mousePos, rotate;

let inputParameters = [
	document.getElementById( "input_XY" ),
	document.getElementById( "input_XZ" ),
	document.getElementById( "input_YZ" ),
	document.getElementById( "input_WX" ),
	document.getElementById( "input_WY" ),
	document.getElementById( "input_WZ" )
]

let spansParameters = [
	document.getElementById( "span_XY" ),
	document.getElementById( "span_XZ" ),
	document.getElementById( "span_YZ" ),
	document.getElementById( "span_WX" ),
	document.getElementById( "span_WY" ),
	document.getElementById( "span_WZ" )
]

export function Setup() 
{
	// Initialisation of settings and canvas
	body = document.getElementsByTagName( "body" )[0];

	parent = document.getElementById( "canvas__anchor" );

	canvas = createCanvas( parent.clientWidth, parent.clientHeight );
	canvas.parent( "canvas__anchor" );

	// These variables are used for rotating the teseract
	mousePos = new Vector();
	rotate = new Vector();

	// Initilisation of hyperCube
	let size = 100;
	hyperCube = new Tesseract( 
		new Vector( width / 2, height / 2, 150, 0 ),
		new Vector( size, size, size, size )
	);

	// Set default params for teseract
	hyperCube.XY = PI / 3;
	hyperCube.XZ = PI / 6;
	hyperCube.YZ = PI / 3;

	stroke( 255, 255, 255, 120 );
	frameRate( 50 );
}

export function Draw() 
{
	//make the rotation dependence on the mouse position 
    let isCanvasCanBeViewed = mouseY < parent.clientHeight;
	if ( mouseIsPressed && isCanvasCanBeViewed ) 
    {
		rotate.x = map( ( mouseX - mousePos.x ), 0, width, 0, 360 );
		rotate.y = map( ( mouseY - mousePos.y ), 0, width, 0, 360 );

		inputParameters[3].value = inputParameters[3].value - ( -rotate.x );
		inputParameters[5].value = inputParameters[5].value - ( -rotate.y );
	}
	mousePos.x = mouseX;
	mousePos.y = mouseY;

	//with each single frame increase rotation for Z and Y axis
	inputParameters[0].value -= -0.5;
	inputParameters[1].value -= -0.5;

	//we don't need rendering, if we don't see 
	if ( parent.getBoundingClientRect().bottom < 0 ) return;

	background( 25, 25, 25 );

	//to make user's output more spectacular we have to set maximum for rotation
	for ( let i = 0; i < inputParameters.length; i++ )
    {
		inputParameters[i].value = Math.round( ( inputParameters[i].value % 360 ) * 1000 ) * 0.001;
    }

	//set textes for spans for each parameter
	spansParameters[0].innerHTML = "XY: " + inputParameters[0].value + " deg";
	spansParameters[1].innerHTML = "XZ: " + inputParameters[1].value + " deg";
	spansParameters[2].innerHTML = "XY: " + inputParameters[2].value + " deg";
	spansParameters[3].innerHTML = "WX: " + inputParameters[3].value + " deg";
	spansParameters[4].innerHTML = "WY: " + inputParameters[4].value + " deg";
	spansParameters[5].innerHTML = "WZ: " + inputParameters[5].value + " deg";

	//set rotation for each direction
	hyperCube.XY = radians( inputParameters[0].value );
	hyperCube.XZ = radians( inputParameters[1].value );
	hyperCube.YZ = radians( inputParameters[2].value );
	hyperCube.WX = radians( inputParameters[3].value );
	hyperCube.WY = radians( inputParameters[4].value );
	hyperCube.WZ = radians( inputParameters[5].value );

	//draw
	hyperCube.Calculate();
	hyperCube.Render();
}