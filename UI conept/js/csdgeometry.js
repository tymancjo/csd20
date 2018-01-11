// This is library file for the
// CSD20 js version

// array manipulation Functions

function simplify(Ar = XsecArray) {
  // this function is about reduce the resolution of the
  // cross section array by 2
  let newArray = [];

  for (let r = 0; r < Rows; r += 2) {
    for (let c = 0; c < Cols; c += 2) {
      // we grab 4 adjected pixels
      //and calculate the average
      let Z = 0;
      let A = 0;
      let B = 0;
      let C = 0;
      let v = [];

      v.push(Ar[index(c, r)]);
      v.push(Ar[index(c + 1, r)]);
      v.push(Ar[index(c, r + 1)]);
      v.push(Ar[index(c + 1, r + 1)]);

      for (let vx of v) {
        if (vx == 0) {
          Z++;
        } else if (vx == 1) {
          A++;
        } else if (vx == 2) {
          B++;
        } else if (vx == 3) {
          C++;
        }
      }

      if (Z > A && Z > B && Z > C) {
        av = 0;
      } else if (A > B && A > C) {
        av = 1;
      } else if (B > C) {
        av = 2;
      } else {
        av = 3;
      }

      newArray.push(av);
    }
  }
  Cols = floor(Cols / 2);
  Rows = floor(Rows / 2);
  return newArray;
} // end of simplify

function subdivide(Ar = XsecArray) {
  // this function is about DOUBLE the resolution of the
  // cross section array
  let newArray = [];

  for (let r = 0; r < Rows; r++) {
    for (let c = 0; c < Cols; c++) {
      newArray.push(Ar[index(c, r)]);
      newArray.push(Ar[index(c, r)]);
    }
    for (let c = 0; c < Cols; c++) {
      newArray.push(Ar[index(c, r)]);
      newArray.push(Ar[index(c, r)]);
    }
  }
  console.log('New Array lenght: ' + newArray.length);
  // adjusting the global variables
  Cols = 2 * Cols;
  Rows = 2 * Rows;
  return newArray;
} // end of subdivide


// array navigation functions
function mouseRC() {
  // this returns the mouse position over canvas
  // converted to Row And Column
  // and the OK state is true if mouse is over canvas

  // taking in the globalZoom in
  mX = floor(mouseX / globalZoom);
  mY = floor(mouseY / globalZoom);

  let state = (mX >= 0 && mX < width && mY >= 0 && mY < height && winMouseX < windowWidth - 20 && winMouseY < windowHeight - 20 && winMouseY > $('.geometry').offset().top);

  let mouseCol = constrain(floor(mX / dXpx), 0, Cols);
  let mouseRow = constrain(floor(mY / dXpx), 0, Rows);

  return {
    OK: state,
    C: mouseCol,
    R: mouseRow
  };
}

function index(C, R) {
  // figuring out the index in 1D array
  return Cols * R + C;
}

function fillArray(Ar, Size, Val) {
  for (let i = 0; i < Size; i++) {
    Ar.push(Val);
  }
  return Ar.length;
}

function setPoint(C, R, Val, XsecArray) {
  // this function set a value in array
  XsecArray[index(C, R)] = Val;
  console.log('setting: ' + index(C, R));
}


// array to canvas drawing functions
function drawPoint(C, R, val = currentPhase) {
  // this function draw the point on canvas
  let color;
  switch (val) {
    case 1:
      color = 'red';
      break;
    case 2:
      color = 'green';
      break;
    case 3:
      color = 'blue';
      break;
    default:
      color = 200;
  }
  fill(color);
  noStroke();
  rect(C * dXpx + 1, R * dXpx + 1, dXpx - 1, dXpx - 1);
}

function drawGrid(R, C, dX) {
  if (dX > minGrid) {
    stroke(125);
    for (let x = dX; x < (C) * dX; x += dX) {
      line(x, 0, x, height);
    }
    for (let x = dX; x < (R) * dX; x += dX) {
      line(0, x, width, x);
    }
  }
} // end of drawGrid

function drawArray(Ar) {
  // this function print back the array to canvas
  if (Cols * Rows == Ar.length) {
    for (let c = 0; c < Cols; c++) { // loop over columns(single row)
      for (let r = 0; r < Rows; r++) { // loop over Rows
        if (Ar[index(c, r)]) {
          drawPoint(c, r, Ar[index(c, r)]);
        }
      }
    }

    return true;
  } else {
    return false;
  }
}


// zoom Functions
function zoom1() {
  console.log('zoom1');
  globalZoom = 1;
  $('canvas').css('transform', 'scale(' + globalZoom + ')');
  // and scroll it back to origin
  $('.geometry').scrollTop(0);
  $('.geometry').scrollLeft(0);
} // end of zoom 1

function zoomin() {
  console.log('zoomin');
  if (globalZoom * 2 < 1) {
    globalZoom *= 2;
  } else {
    globalZoom++;
  }
  $('canvas').css('transform', 'scale(' + globalZoom + ')');
} // end of zoom in

function zoomout() {
  console.log('zoomout');
  if (globalZoom - 1 < 1) {
    globalZoom *= 0.5;
  } else {
    globalZoom--;
  }
  if (globalZoom < 0.1) {
    globalZoom = 0.1;
  }
  $('canvas').css('transform', 'scale(' + globalZoom + ')');
} // end of zoom out
