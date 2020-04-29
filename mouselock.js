var mouseLockActivated = false;
chrome.storage.sync.get("mouseLockActivated", function (result) {
  mouseLockActivated = result.mouseLockActivated;
  onShowMouseLockButton();
  bkg.console.log("Sync Mouse lock: " + mouseLockActivated);
});

function onShowMouseLockButton() {
  document.getElementById("mouselock").textContent = mouseLockActivated
    ? "Mouse lock activated"
    : "Mouse lock disabled";
}
function LockComponents() {
  console.log("LockComponent started");
  var element = null;
  var canvas = document.getElementsByClassName("animated-canvas-centering-box")[0];
  console.log(document.getElementsByClassName("animated-canvas-centering-box"));
  var didMouseUp = false;
  var mouseDown = function lockMouseDown(event) {
    didMouseUp = false;
    // console.log("mousedown Lock");
    // console.log(event);
    // console.log(event.srcElement);
    element = event.srcElement;
    element.requestPointerLock =
      element.requestPointerLock || event.srcElement.mozRequestPointerLock;
    if (canvas.contains(element)) {
      element.requestPointerLock();
      setTimeout(() => {
        if (!didMouseUp) {
          document.exitPointerLock();
          // console.log("End Lock");
        }
      }, 150);
    }
  };
  var mouseUp = function mouseUpHandler(event) {
    console.log("Mouseup");
    setTimeout(() => {
      didMouseUp = true;
      document.exitPointerLock();
      // console.log("End Lock");
      // }
    }, 20);
  };
  var scriptID = "pluginHolder";
  var pluginHolder;
  if (document.getElementById(scriptID)) {
    pluginHolder = document.getElementById(scriptID);
  } else {
    pluginHolder = document.createElement("div");
    pluginHolder.id = scriptID;
    pluginHolder.type = "text";
    pluginHolder.innerHTML = mouseLockActivated;
    pluginHolder.onchange = function (data) {
      console.log("onchange");
      console.log(data);
      if (data == false) {
        document.removeEventListener("mousedown", mouseDown, true);
        document.removeEventListener("mouseup", mouseUp, true);
      } else {
        document.addEventListener("mousedown", mouseDown, true);
        document.addEventListener("mouseup", mouseUp, true);
      }
    };
    document.body.appendChild(pluginHolder);
  }
}
bkg.console.log("START");
chrome.tabs.executeScript(
  {
    code: ";var mouseLockActivated=" + mouseLockActivated + ";(" + LockComponents + ")();", //argument here is a string but function.toString() returns function's code
  },
  (results) => {
    bkg.console.log("INIT SCRIPT");

    // bkg.console.log("Result Lock:");
    // bkg.console.log(results);

    // // mouseLockActivated = results[0];
    // chrome.storage.sync.set({ mouseLockActivated: mouseLockActivated }, function () {
    //   onShowMouseLockButton();
    // });
  }
);

function setPlugin() {
  var scriptID = "pluginHolder";
  var pluginHolder = document.getElementById(scriptID);
  pluginHolder.onchange(mouseLockActivated);
}

document.getElementById("mouselock").addEventListener("click", () => {
  bkg.console.log("Click Lock index");
  mouseLockActivated = !mouseLockActivated;

  chrome.tabs.executeScript(
    {
      code: "var mouseLockActivated=" + mouseLockActivated + ";(" + setPlugin + ")();", //argument here is a string but function.toString() returns function's code
    },
    (results) => {
      bkg.console.log("Result Lock:");
      bkg.console.log(results);
      chrome.storage.sync.set({ mouseLockActivated: mouseLockActivated }, function () {
        onShowMouseLockButton();
      });
    }
  );
});

function removePlugin() {
  console.log("IN");
  var pluginHolder = document.getElementById("pluginHolder");
  pluginHolder.onchange(false);
  pluginHolder.remove();
}
document.getElementById("removemouselock").addEventListener("click", () => {
  chrome.tabs.executeScript(
    {
      code: "(" + removePlugin + ")()",
    },
    (results) => {}
  );
});
