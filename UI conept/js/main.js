// initial global variables to start with.
var dXmm = 20;
var Cols = 60;
var Rows = 50;
var canvasScale = 3;
var mouseCol;
var mouseRow;


function setup(){  // this one comes from p5
  console.log('Starting up');

 // button bindings section
 $('.tab-button').click((e)=>{
   showBar(e.target, e.target.id.split('-')[1]);
 });

 $('.phase-selector').click((e)=>{
   $('.phase-selector').each((i,ev)=>{
     if (e.currentTarget != ev){
       $(ev).removeClass('active');
     } else {
       $(ev).addClass('active');
     }
   });
 });



// p5js Section

let size = Math.min((canvasScale*windowWidth-50)/Cols, (canvasScale*windowHeight-200)/Rows);

var canvas = createCanvas(size*Cols, size*Rows);
canvas.parent('canvas-area');
background(200);

dXpx = Math.min(height/Rows, width/Cols);

drawGrid(Rows,Cols,dXpx);

} // end of p5 Setup

function draw(){
  console.log('updating canvas drawing');
  background(200);
  drawGrid(Rows,Cols,dXpx);
  noLoop();
}


function showBar(btn, BarId){
  // first we hide all of those
  $('.bar').addClass('is-hidden');
  $('.tab-button').removeClass('is-active');

  $('#'+BarId).removeClass('is-hidden');
  $(btn).addClass('is-active');

}

function drawGrid(R,C,dX){
  stroke(125);
  for(let x=dX; x < (C)*dX; x+=dX){
    line(x,0,x,height);
  }
  for(let x=dX; x < (R)*dX; x+=dX){
    line(0,x,width,x);
  }
} // end of drawGrid

function mouseMoved() {
  mouseCol = floor(mouseX / dXpx)
  mouseRow = floor(mouseY / dXpx)
  // console.log(mouseCol, mouseRow);
  // prevent default
  return false;
} // end of mouseMoved


function mouseDragged() {
  mouseCol = floor(mouseX / dXpx)
  mouseRow = floor(mouseY / dXpx)

  fill(230);
  noStroke();
  rect(mouseCol*dXpx+1, mouseRow*dXpx+1, dXpx-2, dXpx-2);

  // checking if we nweed to draw

  // prevent default
  return false;
} // end of mouseMoved


// function mousePressed() {
//    // redraw(1);
//  } // end of mousePressed
