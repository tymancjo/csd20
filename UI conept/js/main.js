// initial global variables to start with.
var dXmm = 20;
var Cols = 60;
var Rows = 50;
var canvasScale = 3;
var mouseCol;
var mouseRow;
var currentPhase = 1;


function setup() { // this one comes from p5
  console.log('Starting up');

  // button bindings section
  $('.tab-button').click((e) => {
    showBar(e.target, e.target.id.split('-')[1]);
  });

  $('.phase-selector').click((e) => {

    $('.phase-selector').each((i, ev) => {
      if (e.currentTarget != ev) {
        $(ev).removeClass('active');
      } else {
        $(ev).addClass('active');
        switch (ev.id) {
          case 'phA':
            currentPhase = 1;
            break;
          case 'phB':
            currentPhase = 2;
            break;
          case 'phC':
            currentPhase = 3;
            break;

          default:
        } // end of switch

      } // end of else
    });
  }); // end of phase selector



  // p5js Section

  let size = Math.min(floor((canvasScale * windowWidth - 50) / Cols), floor((canvasScale * windowHeight - 200) / Rows));

  var canvas = createCanvas(size * Cols, size * Rows);
  canvas.parent('canvas-area');
  background(200);

  dXpx = floor(min(height / Rows, width / Cols));

  drawGrid(Rows, Cols, dXpx);

} // end of p5 Setup


// DRAW MAIN LOOP
function draw() {
  console.log('updating canvas drawing');
  background(200);
  drawGrid(Rows, Cols, dXpx);
  noLoop();
} // end of DRAW



// Custom Functions
function showBar(btn, BarId) {
  // first we hide all of those
  $('.bar').addClass('is-hidden');
  $('.tab-button').removeClass('is-active');

  $('#' + BarId).removeClass('is-hidden');
  $(btn).addClass('is-active');

}

function drawGrid(R, C, dX) {
  stroke(125);
  for (let x = dX; x < (C) * dX; x += dX) {
    line(x, 0, x, height);
  }
  for (let x = dX; x < (R) * dX; x += dX) {
    line(0, x, width, x);
  }
} // end of drawGrid

function mouseMoved() {
  mouseCol = floor(mouseX / dXpx)
  mouseRow = floor(mouseY / dXpx)
  console.log(mouseCol, mouseRow);
  // prevent default
  return false;
} // end of mouseMoved


function mouseDragged() {
  mouseCol = floor(mouseX / dXpx)
  mouseRow = floor(mouseY / dXpx)

  let color;
  switch (currentPhase) {
    case 1:
      color = 'red';
      break;
    case 2:
      color = 'green';
      break;
    case 3:
      color = 'blue';
      break
    default:
      color = 'white';
  }
  fill(color);
  noStroke();
  rect(mouseCol * dXpx + 1, mouseRow * dXpx + 1, dXpx - 1, dXpx - 1);

  // prevent default
  return false;
} // end of mouseMoved


// function mousePressed() {
//    // redraw(1);
//  } // end of mousePressed
