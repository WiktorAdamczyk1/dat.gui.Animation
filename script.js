"use strict";
//---------------------------------------------
var context;
var backgroundColor = "#333";
var myCanvas, myFrameVar, mySmokeVar;
var myAngle = 0;
var myCircle;
var myCircles = [];
var road;
var cabin, cabinWidth = 140, cabinHeight = 160;
var cabinBottom, cabinBottomWidth = 250, cabinBottomHeight = 30;
var trailer, trailerWidth = 300, trailerHeight = 150;
var trailer2, trailer2Width = 60, trailer2Height = 115;
var exhaust, exhaustWidth = 5, exhaustHeight = 60;
var light, lightWidth = 10, lightHeight = 30;
var wagonWindow, wagonWindowWidth = 60, wagonWindowHeight = 60;

var smokeArray = [], smokeDx = 1, smokeRadius = 0.8, smokeAlpha = 0.5, smokeWidth = 10, smokeHeight = 5;

function To(){
 this.timeout = 50;
}
var ob = new To;

var balloon, balloons = [], myBalloonVar;
//=================================================================================================

function updateCanvas() {
    myCanvas = document.getElementById( "myCanvas" );
    context = myCanvas.getContext( "2d" );


    context.fillStyle = backgroundColor;
    context.fillRect( 0, 0, myCanvas.width, myCanvas.height );



    road = new Rect( "#333" );
    road.scaleX = myCanvas.width;
    road.scaleY = 50;
    road.setReferencePoint( 0, myCanvas.height-50 );
    //-----------------------koła przód--------------------------\\
    myCircle = new Circle();
    myCircle.Color = "#FF3F3F";
    myCircle.Radius = 20;
    myCircle.setReferencePoint( 550, myCanvas.height - myCircle.Radius )
    myCircle.Alpha = Math.floor( Math.random() * 360 );
    myCircles.push( myCircle );
    
    myCircle = new Circle();
    myCircle.Color = "#FF3F3F";
    myCircle.Radius = 20;
    myCircle.setReferencePoint( 380, myCanvas.height - myCircle.Radius )
    myCircle.Alpha = Math.floor( Math.random() * 360 );
    myCircles.push( myCircle );
    
    //-----------------------trailer koła --------------------------\\
    
    myCircle = new Circle();
    myCircle.Color = "#FF3F3F";
    myCircle.Radius = 20;
    myCircle.setReferencePoint( 180, myCanvas.height - myCircle.Radius )
    myCircle.Alpha = Math.floor( Math.random() * 360 );
    myCircles.push( myCircle );
    
    myCircle = new Circle();
    myCircle.Color = "#FF3F3F";
    myCircle.Radius = 20;
    myCircle.setReferencePoint( 140, myCanvas.height - myCircle.Radius )
    myCircle.Alpha = Math.floor( Math.random() * 360 );
    myCircles.push( myCircle );

    myCircle = new Circle();
    myCircle.Color = "#FF3F3F";
    myCircle.Radius = 20;
    myCircle.setReferencePoint( 100, myCanvas.height - myCircle.Radius )
    myCircle.Alpha = Math.floor( Math.random() * 360 );
    myCircles.push( myCircle );
    
    //----------------------------- cabin--------------------------\\
    cabin = new Rect( "#FF0000" );
    cabin.scaleX = cabinWidth;
    cabin.scaleY = cabinHeight;
    cabin.setReferencePoint( 450, myCanvas.height - 2 * myCircles[ 0 ].Radius - cabin.scaleY );
    
    cabinBottom = new Rect( "#8e8282" );
    cabinBottom.scaleX = cabinBottomWidth;
    cabinBottom.scaleY = cabinBottomHeight;
    cabinBottom.setReferencePoint( 340, myCanvas.height - 2 * myCircles[ 0 ].Radius - cabinBottom.scaleY );

    exhaust = new Rect( "#8e8282");
    exhaust.scaleX = exhaustWidth;
    exhaust.scaleY = exhaustHeight;
    exhaust.setReferencePoint( cabin.X0+15, cabin.Y0-35);

    wagonWindow = new Rect( "#41f0fa" ); 
    wagonWindow.scaleX = wagonWindowWidth;
    wagonWindow.scaleY = wagonWindowHeight;
    wagonWindow.setReferencePoint( cabin.X0+80, cabin.Y0 +5 );
    
    light = new Rect( "#dbcf0b" ); 
    light.scaleX = lightWidth;
    light.scaleY = lightHeight;
    light.setReferencePoint( cabin.X0+cabinWidth-8, cabin.Y0 +cabinHeight-cabinBottomHeight -15 );

    //-----------------------trailer--------------------------\\
    trailer = new Rect( "#F1C40F " );
    trailer.scaleX = trailerWidth;
    trailer.scaleY = trailerHeight;
    trailer.setReferencePoint( 50, myCanvas.height - 2 * myCircles[ 2 ].Radius - trailer.scaleY );

    trailer2 = new Rect( "#F1C40F " );
    trailer2.scaleX = trailer2Width;
    trailer2.scaleY = trailer2Height;
    trailer2.setReferencePoint( 350, (myCanvas.height - 2 * myCircles[ 2 ].Radius - trailer2.scaleY) - 35 );
        

    

//-------------------------------------------------\\

    myFrameVar = setTimeout( nextFrame, 100 );
    mySmokeVar = setTimeout( nextSmokeFrame, 500 );
    myBalloonVar = setTimeout( nextBalloonAnimation, 200 );

    var gui = new dat.GUI();
    gui.addColor(cabin, 'Color');
    gui.add(exhaust, 'scaleX', 2, 10);
    gui.add(ob,'timeout', 2, 200);
}
//=================================================================================================

function Circle( ) {
    this.X = 0;
    this.Y = 0;

    this.display = function() {
        context.fillStyle = this.Color;
        context.beginPath();
        context.arc( this.X, this.Y, this.Radius, 0, Math.PI * 2, true );
        context.closePath();
        context.fill();

        context.fillStyle = backgroundColor;
        context.beginPath();
        context.arc( this.X, this.Y + this.Radius / 2, this.Radius / 4, 0, Math.PI * 2, true );
        context.closePath();
        context.fill(); 
    }

    this.setReferencePoint = function( x, y ) {
        this.X0 = x;
        this.Y0 = y;
    }
}

//=================================================================================================

function get_random_color() 
{
    var color = "";
    for(var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
    return "#" + color;
}

function Balloon( rX, rY ) {
    this.X = 0;
    this.Y = 0;
    var color = get_random_color();
    this.display = function() {
        context.fillStyle = "#333";
        context.beginPath();
        context.rect( this.X - 0.025 , this.Y, 0.05, 0.6 );
        context.closePath();
        context.fill(); 

        context.fillStyle = color;
        context.beginPath();
        context.arc( this.X, this.Y, 0.2, 0, Math.PI * 2, true );
        context.closePath();
        context.fill();
    }

    this.setReferencePoint = function( x, y ) {
        this.X0 = x;
        this.Y0 = y;
    }

    this.setScale = function( s ) {
        this.S = s;
    }
}


function nextFrame() {
    context = myCanvas.getContext( "2d" );

    context.fillStyle = backgroundColor;
    context.clearRect( 0, 0, myCanvas.width, myCanvas.height );
    
//-------------------------------------------------------------------
for ( let i = 0; i < balloons.length; i ++ ) {
    var balloon = balloons[ i ];
    var balloonScale = balloon.S;
    if ( balloonScale == 1 ) { 
        balloon.setReferencePoint( balloon.X0 - 2, balloon.Y0+Math.random()*1-Math.random()*1);
        context.save();
            context.transform( 10, 0, 0, 20, balloon.X0, balloon.Y0 );
            balloon.display();
        context.restore();
    }
    else 
        if ( balloonScale == 2 ) {
            balloon.setReferencePoint( balloon.X0 - 5, balloon.Y0+Math.random()*2-Math.random()*2);
            context.save();
                context.transform( 20, 0, 0, 40, balloon.X0, balloon.Y0 );
                balloon.display();
            context.restore();
    }
    else 
        if ( balloonScale == 3 ) {
            balloon.setReferencePoint( balloon.X0 - 7, balloon.Y0+Math.random()*3-Math.random()*3 );
            context.save();
                context.transform( 30, 0, 0, 60, balloon.X0, balloon.Y0 );
                balloon.display();
            context.restore();
        }
    if ( balloon.X0 < 0 ) balloons.splice( i, 1 );
}
//-------------------------------------------------------------------

    context.save();
    context.transform( road.scaleX, 0, 0, road.scaleY, road.X0, road.Y0 );
    road.display();
    context.restore();

    myAngle += 10;
    myAngle %= 360;

    var maxRadius = myCircles[ 0 ].Radius;
    for ( let i = 1; i < myCircles.length; i ++ ) {
        if ( myCircles[ i ].Radius > maxRadius ) maxRadius = myCircles[ i ].Radius;
    }

    for ( let i = 0; i < myCircles.length; i ++ ) {
        myCircle = myCircles[ i ];
        let sinA = Math.sin( ( myAngle + myCircle.Alpha ) * Math.PI / 180.0 * maxRadius / myCircle.Radius );
        let cosA = Math.cos( ( myAngle + myCircle.Alpha ) * Math.PI / 180.0 * maxRadius / myCircle.Radius );
        context.save();
            context.transform( cosA, sinA, -sinA, cosA, myCircle.X0, myCircle.Y0 );
            myCircle.display();
        context.restore();
    }

    context.save();
    context.transform( cabin.scaleX, 0, 0, cabin.scaleY, cabin.X0, cabin.Y0 );
    cabin.display();
    context.restore();
    
    context.save();
    context.transform( cabinBottom.scaleX, 0, 0, cabinBottom.scaleY, cabinBottom.X0, cabinBottom.Y0 );
    cabinBottom.display();
    context.restore();
    
    context.save();
    context.transform( exhaust.scaleX, 0, 0, exhaust.scaleY, exhaust.X0, exhaust.Y0 );
    cabinBottom.display();
    context.restore();
    
    context.save();
    context.transform( trailer.scaleX, 0, 0, trailer.scaleY, trailer.X0, trailer.Y0 );
    trailer.display();
    context.restore();

    context.save();
    context.transform( trailer2.scaleX, 0, 0, trailer2.scaleY, trailer2.X0, trailer2.Y0 );
    trailer2.display();
    context.restore();

    context.save();
    context.transform( light.scaleX, 0, 0, light.scaleY, light.X0, light.Y0 );
    light.display();
    context.restore();

    context.save();
    context.transform( wagonWindowWidth, 0, 0, wagonWindowHeight, wagonWindow.X0, wagonWindow.Y0 );
    wagonWindow.display();
    context.restore();

        console.log( smokeArray.length );
        for ( let i = 0; i < smokeArray.length; i ++ ) {
            let smoke = smokeArray[ i ];
             if ( smoke.alpha > 0.01 ) { 
                smoke.alpha -= 0.004;
                smoke.scaleX *= 1.01;
                smoke.scaleY *= 1.005;
                smoke.Dx += 0.05;
                smoke.setReferencePoint( smoke.X0 - 2, smoke.Y0  -= 0.8 / Math.log( smoke.Dx ) );
                context.save();
                    context.globalAlpha = smoke.alpha;
                    context.transform( smoke.scaleX, 0, 0, smoke.scaleY, smoke.X0, smoke.Y0 );
                    smoke.display();
                context.restore();
            }
            else smokeArray.splice( i, 1 );
        }


    myFrameVar = setTimeout( nextFrame, 100 );

}
//=================================================================================================
//=================================================================================================
function Smoke( ) {
    this.X = 0;
    this.Y = 0;

    this.display = function() {
        context.fillStyle = this.Color;
        context.beginPath();
        context.arc( this.X, this.Y, this.Radius, 0, Math.PI * 2, true );
        context.closePath();
        context.fill();
    }

    this.setReferencePoint = function( x, y ) {
        this.X0 = x;
        this.Y0 = y;
    }
}

function nextSmokeFrame( ) {
    var smoke = new Smoke( );
    smoke.Color = "#ffffff";
    smoke.scaleX = smokeWidth;
    smoke.scaleY = smokeHeight;
    smoke.Radius = smokeRadius;
    smoke.Dx = smokeDx;
    smoke.alpha = smokeAlpha;

    smoke.setReferencePoint( exhaust.X0, exhaust.Y0 + 5 );
//    console.log( smoke );
    smokeArray.push( smoke );

    mySmokeVar = setTimeout( nextSmokeFrame, 500 );
}

function Rect( color )
{
    this.X = 0;
    this.Y = 0;
    this.W = 1;
    this.H = 1;
    this.Color = color;
    this.X0 = 0;
    this.Y0 = 0;

    this.display = function( ) { 
      context.fillStyle = this.Color;
      context.fillRect( this.X, this.Y, this.W, this.H );
       
    };

    this.setReferencePoint = function( x, y ) {
        this.X0 = x;
        this.Y0 = y;
    }
}

function nextBalloonAnimation( ) {
    var isOK = Math.floor( Math.random() * 5 );
    console.log( isOK, balloons.length  );
    //isOK = 1;
    if ( isOK === 1 ) {
        var cY = Math.floor( Math.random() * ( myCanvas.height - 200 ) );
        balloon = new Balloon( myCanvas.width, cY );
        if ( cY < myCanvas.height / 4 ) balloon.setScale( 1 );
        else if ( cY < myCanvas.height / 2 ) balloon.setScale( 2 );
        else balloon.setScale( 3 );
        balloon.setReferencePoint( myCanvas.width, cY );
        balloons.push( balloon );
    }
//-------------------------------------------------------------------
    myBalloonVar = setTimeout( nextBalloonAnimation, ob.timeout );
}


//=================================================================================================