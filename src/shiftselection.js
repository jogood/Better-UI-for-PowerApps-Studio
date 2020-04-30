function shiftselection() {
  var ctx = {
    scriptID: "shiftplugin",
    pluginActivated: false,
    // pluginElement: null,
  };

  function onShowShiftSelectionButton() {
    document.getElementById("shiftselect").textContent = ctx.pluginActivated
      ? "Shift selection activated"
      : "Shift selection disabled";
  }

  function pluginOnChange(data) {
    console.log(data);
  }

  // Initialize plugin
  function initialization() {

    chrome.storage.sync.get("shiftSelectActivated", function (result) {

      ctx.pluginActivated = result.shiftSelectActivated;
      onShowShiftSelectionButton();
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
            pluginOnChange +
            ");", //argument here is a string but function.toString() returns function's code
        },
        (results) => {

        //   ctx.pluginElement = results[0];
          // ctx.pluginElement.onchange = function (data) {};
        //   bkg.console.log(ctx.pluginElement);
        }
      );
    });
  }

  initialization();

  document.getElementById("shiftselect").addEventListener("click", () => {
    bkg.console.log("Click shift index");
    ctx.pluginActivated = !ctx.pluginActivated;
    chrome.tabs.executeScript(
      {
        code: "(" + setPluginHolder + ")('" + ctx.scriptID + "'," + ctx.pluginActivated + ");", //argument here is a string but function.toString() returns function's code
      },
      (results) => {
        chrome.storage.sync.set({ shiftSelectActivated: ctx.pluginActivated }, function () {
          onShowMouseLockButton();
        });
      }
    );
  });
  document.getElementById("removeshiftselect").addEventListener("click", () => {
    chrome.tabs.executeScript(
      {
        code: "(" + removePlugin + ")('" + ctx.scriptID + "')",
      },
      (results) => {}
    );
  });

  // var simulateCtrlClick = function simulateCtrlClick(elem) {
  // 	// Create our event (with options)
  // 	var evt = new MouseEvent('click', {
  // 		bubbles: true,
  // 		cancelable: true,
  //         ctrlKey: true,
  // 		view: window
  // 	});
  // 	// If cancelled, don't dispatch our event
  // 	var canceled = !elem.dispatchEvent(evt);
  // };
}
shiftselection();
