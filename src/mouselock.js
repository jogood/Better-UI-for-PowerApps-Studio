function mouselock() {
  var mouseLockActivated = false;
  var ctx = {
    scriptID: "lockplugin",
    pluginActivated: false,
    // pluginElement: null,
  };
  function onShowMouseLockButton() {
    document.getElementById("mouselock").textContent = ctx.pluginActivated
      ? "Mouse lock activated"
      : "Mouse lock disabled";
  }

  function pluginOnChange(data,scriptID) {
    console.log("LockComponent started");
    var element = null;
    var canvas = document.getElementsByClassName("animated-canvas-centering-box")[0];
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
      }, 20);
    };
    pluginHolder = document.getElementById(scriptID);
    pluginHolder.onchange = function (d) {
      console.log("onchange");
      console.log(d);
      if (d == false) {
        document.removeEventListener("mousedown", mouseDown, true);
        document.removeEventListener("mouseup", mouseUp, true);
      } else {
        document.addEventListener("mousedown", mouseDown, true);
        document.addEventListener("mouseup", mouseUp, true);
      }
    };
    pluginHolder.onchange(data);
  }

  function initialisation() {
    chrome.storage.sync.get("mouseLockActivated", function (result) {
      ctx.pluginActivated = result.mouseLockActivated;
      onShowMouseLockButton();
      chrome.tabs.executeScript(
        {
          code:
            "(" +
            getOrCreatePluginHolder +
            ")('" +
            ctx.scriptID +
            "'," +
            ctx.pluginActivated +
            "," +
            // "null" +
            pluginOnChange +
            ");", //argument here is a string but function.toString() returns function's code
        },
        (results) => {
          bkg.console.log("Initialized plugin holder (mouse lock)");
          bkg.console.log(results);
          
        }
      );
    });
  }
  initialisation();


  document.getElementById("mouselock").addEventListener("click", () => {
    bkg.console.log("Click lock index");
    ctx.pluginActivated = !ctx.pluginActivated;
    chrome.tabs.executeScript(
      {
        code: "(" + setPluginHolder + ")('" + ctx.scriptID + "'," + ctx.pluginActivated + ");", //argument here is a string but function.toString() returns function's code
      },
      (results) => {
        chrome.storage.sync.set({ mouseLockActivated: ctx.pluginActivated }, function () {
          onShowMouseLockButton();
        });
      }
    );
  });

  // function removePlugin() {
  //   console.log("IN");
  //   var pluginHolder = document.getElementById("pluginHolder");
  //   if (pluginHolder.onchange != null) pluginHolder.onchange(false);
  //   pluginHolder.remove();
  // }
  document.getElementById("removemouselock").addEventListener("click", () => {
    chrome.tabs.executeScript(
      {
        code: "(" + removePlugin + ")('" + ctx.scriptID + "')",
      },
      (results) => {}
    );
  });
}
mouselock();
