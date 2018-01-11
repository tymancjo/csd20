// This is library file for the
// CSD20 js version

function mouseRC(){
  // this returns the mouse position over canvas
  // converted to Row And Column
  // and the OK state is true if mouse is over canvas

      // taking in the globalZoom in
      mX = floor(mouseX / globalZoom);
      mY = floor(mouseY / globalZoom);

      let state = (mX >= 0 && mX < width && mY >= 0 && mY < height && winMouseX < windowWidth - 20 && winMouseY < windowHeight -20 && winMouseY > $('.geometry').offset().top);

      let mouseCol = constrain(floor(mX / dXpx), 0, Cols);
      let mouseRow = constrain(floor(mY / dXpx), 0, Rows);

  return {OK:state, C:mouseCol, R:mouseRow}
}

function fillArray(Ar, Size, Val) {
  for (let i = 0; i < Size; i++){
    Ar.push(Val);
  }
  return Ar.length;
}

function drawArray(Ar){
  // this function print back the array to canvas
  if (Cols*Rows == Ar.length){
    for (let c=0; c < Cols; c++){ // loop over columns(single row)
      for (let r=0; r < Rows; r++){ // loop over Rows
          if(Ar[index(c,r)]){
            drawPoint(c,r,Ar[index(c,r)]);
          }
       }
    }

    return true;
  } else { return false}
}

function index(C,R){
  // figuring out the index in 1D array
  return Cols * R + C;
}

function setPoint(C, R, Val, XsecArray) {
  // this function set a value in array
  XsecArray[index(C,R)] = Val;
  console.log('setting: '+index(C,R));
}

function drawPoint(C, R, val=currentPhase) {
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
      break
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
    globalZoom *= 2
  } else {
    globalZoom++;
  }
  $('canvas').css('transform', 'scale(' + globalZoom + ')');
} // end of zoom in

function zoomout() {
  console.log('zoomout');
  if (globalZoom - 1 < 1) {
    globalZoom *= 0.5
  } else {
    globalZoom--;
  }
  if (globalZoom < 0.1) {
    globalZoom = 0.1
  }
  $('canvas').css('transform', 'scale(' + globalZoom + ')');
} // end of zoom out
