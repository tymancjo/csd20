# CSD 2.0 interface framework for JS HTML GUI
# by Tomasz Tomanek - TymancjO
# Based on Hello world example.
# Doesn't depend on any third party GUI framework.
# Tested with CEF Python v55.3+.

from cefpython3 import cefpython as cef
import platform
import sys
import numpy as np

# Importing local library
from csdlib import csdlib as csd
from csdlib.vect import Vector as v2
from csdlib import csdgui20 as gui


def main():
    check_versions()
    sys.excepthook = cef.ExceptHook  # To shutdown all CEF processes on error
    cef.Initialize()

    browserSettings = {
        'file_access_from_file_urls_allowed': True,
        'universal_access_from_file_urls_allowed': True,
    }

    browser = cef.CreateBrowserSync(url="file:///ui/index.html",
                                    window_title="CSD 2.0", settings=browserSettings)

    set_javascript_bindings(browser)
    cef.MessageLoop()
    cef.Shutdown()


def check_versions():
    print("[hello_world.py] CEF Python {ver}".format(ver=cef.__version__))
    print("[hello_world.py] Python {ver} {arch}".format(
          ver=platform.python_version(), arch=platform.architecture()[0]))
    assert cef.__version__ >= "55.3", "CEF Python v55.3+ required to run this"


def set_javascript_bindings(browser):
    bindings = cef.JavascriptBindings(
            bindToFrames=False, bindToPopups=False)

    bindings.SetFunction("PyFunction", PyFunction)
    browser.SetJavascriptBindings(bindings)


def PyFunction(arg):
    #  This is the main JS to Py communication function
    print('Getting form JS:')
    print(arg['Arr'], arg['dX'], arg['C'])

    #  for now we will work only over the XsectionArray
    #  reading data delivered form JS
    Arr = np.array(arg['Arr'])
    dX = float(arg['dX'])
    Columns = int(arg['C'])

    # Now lets work on the array to make it 2D
    Rows = int(Arr.shape[0] / Columns)
    XsecArr = np.zeros((Rows, Columns), dtype=float)

    print(XsecArr.shape)

    # And now we prepare the array as 2D
    i = 0
    for r in range(Rows):
        for c in range(Columns):
            XsecArr[r, c] = Arr[i]
            i += 1

    # now lets try to call for solver from library
    # currentDensityPro(XsecArr, dXmm, dYmm, lenght,  freq, Currents, temperature, HTC, Gcon, GmxString)
    Solver = gui.currentDensityPro(XsecArr, dX, dX, 1000,  50, '1000;0;1000;120;1000;240', 140, 10, 10, '0;0;0|0;0;0|0;0;0')

    print(Solver)
    # powerAnalysis
    Solver.powerAnalysis()
    # calcTempRise
    # showResults
    Solver.showResults()
    # showTemperatureResults

#
#
#
#

if __name__ == '__main__':
    main()
