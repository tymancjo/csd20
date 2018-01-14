// initial global variables to start with.
XsecArray = [];
var dXmm = 10;
var Cols = 20;
var Rows = 20;
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
var isModal = false;
var mouseBox;
var posXmm;
var posYmm;
var phaseColor = 'red';




function setup() { // this one comes from p5
  console.log('Starting up');
  let asize = fillArray(XsecArray, Rows * Cols, 0);
  console.log('array elements: ' + asize);
  mouseBox = $('#mouseBox');
  posXmm = $('#posXmm');
  posYmm = $('#posYmm');



  // button bindings section
  $('.tab-button').click((e) => {
    showBar(e.target, e.target.id.split('-')[1]);
  });

  $('#newfile').click(newfile);

  $('#zoomout').click(zoomout);
  $('#zoomin').click(zoomin);
  $('#zoom1').click(zoom1);
  $('#reload').click(reload);

  $('#subdivide').click(() => {
    if (Cols < 2000 && Rows < 2000) {
      XsecArray = subdivide();
      redrawAndUpdate();
    }
  });

  $('#simplify').click(() => {
    if (Cols >= 4 && Rows >= 4) {
      XsecArray = simplify();
      redrawAndUpdate();
    }
  });

  $('#pattern').click(() => {
    $("#patterninput").removeClass('is-hidden');
    isModal = true;
  });

  $('#patternCancel').click(() => {
    $("#patterninput").addClass('is-hidden');
    isModal = false;
  });

  $('#patternOK').click(() => {
    let C = parseInt($('#patternC').val());
    let R = parseInt($('#patternR').val());
    let N = parseInt($('#patternN').val());

    let patternSrc = parseInt($('input[name=patternSrc]:checked').val());
    let patternAs = parseInt($('input[name=patternAs]:checked').val());

    if ((N > 0) && (abs(C) > 0 || abs(R) > 0)) {
      $("#patterninput").addClass('is-hidden');
      isModal = false;
      console.log('lets pattren');
      pattern(C, R, N, patternSrc, patternAs);
      reload();
    }
  });

  $('#swap').click(() => {
    $("#swapinput").removeClass('is-hidden');
    isModal = true;
  });

  $('#swapCancel').click(() => {
    $("#swapinput").addClass('is-hidden');
    isModal = false;
  });

  $('#swapOK').click(() => {
    let C = parseInt($('#swapC').val());
    let R = parseInt($('#swapR').val());
    let N = parseInt($('#swapN').val());

    let patternSrc = parseInt($('input[name=swapSrc]:checked').val());
    let patternAs = parseInt($('input[name=swapAs]:checked').val());

      $("#swapinput").addClass('is-hidden');
      isModal = false;
      console.log('lets swap');
      pattern(0, 0, 1, patternSrc, patternAs);
      reload();
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
            phaseColor = 'red';
            break;
          case 'phB':
            currentPhase = 2;
            phaseColor = 'green';
            break;
          case 'phC':
            currentPhase = 3;
            phaseColor = 'blue';
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
    size = 4;
  }

  // // lets normalize the scale now
  // canvasScale = Math.max(windowWidth / width, windowHeight / height);


  var canvas = createCanvas(size * Cols, size * Rows);
  canvas.parent('canvas-area');
  background(200);

  dXpx = round(min(height / Rows, width / Cols));

  drawGrid(Rows, Cols, dXpx);

} // end of p5 Setup


// DRAW MAIN LOOP
function draw() {
  // console.log('updating canvas drawing');
  // background(200);
  // drawGrid(Rows, Cols, dXpx);
  noLoop();
} // end of DRAW

function windowResized() {
  reload();
} // end of resizedWindow



// Custom Functions

function redrawAndUpdate() {
  dXpx = round(min(height / Rows, width / Cols));
  resizeCanvas(dXpx * Cols, dXpx * Rows);
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
  if (!isModal) {
    if (mouseRC().OK) {
      infoBubble();
    }
  }
  // prevent default
  return false;
} // end of mouseMoved

function mouseDraw() {
  // this function react on user mouse moves and presses on canvas area.

  if (!isModal) {
    if (mouseRC().OK) { // if we are over canvas
      let val;

      if (mouseButton === LEFT) { // setting the value
        val = currentPhase;
      } else if (mouseButton === RIGHT) { // reseting the value
        val = 0;
      }
      setPoint(mouseRC().C, mouseRC().R, val, XsecArray);
      drawPoint(mouseRC().C, mouseRC().R, val);

      infoBubble();

    } // end if mouseRC().OK
  } // end of isModal
} // end of Mouse Draw

function infoBubble(){
  // mouse move position info bubble
  mouseBox.css('left',winMouseX+30 + 'px');
  mouseBox.css('top',winMouseY + 'px');
  mouseBox.css('background-color', phaseColor);
  posXmm.text(floor(mouseX*dXmm/dXpx));
  posYmm.text(floor(mouseY*dXmm/dXpx));
}

function mouseDragged() {
  if (!isModal) {
    if (mouseButton !== CENTER) { // drawing and setting up array
      mouseDraw();

    } else { // paning around with mouse

      $('.geometry').scrollTop(currentScrollY + dragStartY - winMouseY);
      $('.geometry').scrollLeft(currentScrollX + dragStartX - winMouseX);
    }
    // prevent default
    return false;
  }
} // end of mouseMoved


function mousePressed() {
  if (!isModal) {
    if (mouseButton !== CENTER) { // drawing and setting up array
      mouseDraw();
    } else { // setting up drag start point for panning
      dragStartX = winMouseX;
      dragStartY = winMouseY;
      currentScrollX = $('.geometry').scrollLeft();
      currentScrollY = $('.geometry').scrollTop();
    }

    // prevent default
    return false;
  }
} // end of mousePressed

function mouseReleased() {
  if (!isModal) {
    // prevent default
    return false;
  }
} // end of mouse mouseReleased
