// This is library file for the
// CSD20 js version


function newfile() {
  // this function is about clear the data and get ready for new
  // firs lets chack if we have empty array now
  let okToDelete = false;

  if (XsecArray.reduce((a, b) => a + b, 0)) {
    if (confirm("Are you sure to delete current data ?") == true) {
      okToDelete = true;
    }
  }

  if (okToDelete) { // frm here we do the new file
    Rows = 20;
    Cols = 20;
    dXmm = 10;
    XsecArray = [];
    fillArray(XsecArray, Rows * Cols, 0);

    reload();
  } // end if ok to delete
} // end of newfile
