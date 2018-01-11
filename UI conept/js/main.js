// initial global variables to start with.
XsecArray = [];
var dXmm = 20;
var Cols = 100;
var Rows = 100;
var canvasScale = 1;
var globalZoom = 1;
var minGrid = 3;
var mouseCol;
var mouseRow;
var currentPhase = 1;
var dragStartX;
var dragStartY;
var currentScrollX;
var currentScrollY;




function setup() { // this one comes from p5
  console.log('Starting up');
  let asize = fillArray(XsecArray, Rows * Cols, 0);
  console.log('array elements: ' + asize);



  // button bindings section
  $('.tab-button').click((e) => {
    showBar(e.target, e.target.id.split('-')[1]);
  });

  $('#zoomout').click(zoomout);
  $('#zoomin').click(zoomin);
  $('#zoom1').click(zoom1);


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

  // disabling the defoult right click on canvas element
  $('canvas').contextmenu(() => false);

  // p5js Section

  let size = Math.min(floor((canvasScale * windowWidth - 50) / Cols), floor((canvasScale * windowHeight - 200) / Rows));

  if (size < 4) {
    size = 4
  }

  // lets normalize the scale now
  canvasScale = Math.max(windowWidth / width, windowHeight / height);


  var canvas = createCanvas(size * Cols, size * Rows);
  canvas.parent('canvas-area');
  background(200);

  dXpx = floor(min(height / Rows, width / Cols));

  drawGrid(Rows, Cols, dXpx);

} // end of p5 Setup


// DRAW MAIN LOOP
function draw() {
  // console.log('updating canvas drawing');
  // background(200);
  // drawGrid(Rows, Cols, dXpx);
  noLoop();
} // end of DRAW



// Custom Functions



function redrawAndUpdate() {
  background(200);
  drawGrid(Rows, Cols, dXpx);
  drawArray(XsecArray);
} // end of redraw and update

function showBar(btn, BarId) {
  // first we hide all of those
  $('.bar').addClass('is-hidden');
  $('.tab-button').removeClass('is-active');

  $('#' + BarId).removeClass('is-hidden');
  $(btn).addClass('is-active');
} // end of show bar



function mouseMoved() {
  // prevent default
  return false;
} // end of mouseMoved

function mouseDraw(){
  // this function react on user mouse moves and presses on canvas area.

  if (mouseRC().OK) { // if we are over canvas
        let val;

        if(mouseButton === LEFT){ // setting the value
          val = currentPhase;
        } else if (mouseButton === RIGHT){ // reseting the value
          val = 0;
        }
        setPoint(mouseRC().C, mouseRC().R, val, XsecArray);
        drawPoint(mouseRC().C, mouseRC().R, val);
      }// end if mouseRC().OK
} // end of Mouse Draw

function mouseDragged() {
  if(mouseButton !== CENTER){ // drawing and setting up array
    mouseDraw();
  } else { // paning around with mouse

    $('.geometry').scrollTop(currentScrollY + dragStartY - winMouseY);
    $('.geometry').scrollLeft(currentScrollX + dragStartX - winMouseX);
  }
  // prevent default
  return false;
} // end of mouseMoved


function mousePressed() {
  if(mouseButton !== CENTER){ // drawing and setting up array
    mouseDraw();
  } else { // setting up drag start point for panning
    dragStartX = winMouseX;
    dragStartY = winMouseY;
    currentScrollX = $('.geometry').scrollLeft();
    currentScrollY = $('.geometry').scrollTop();
  }

  // prevent default
  return false;
} // end of mousePressed

function mouseReleased(){
  // prevent default
  return false;
}// end of mouse mouseReleased
