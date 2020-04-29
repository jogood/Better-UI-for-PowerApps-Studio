var config = {
  scriptID: "shiftplugin",
  shiftSelectActivated: false,
};

var ctx = {
  shiftPlugin: null,
};

function onShowShiftSelectionButton() {
  document.getElementById("shiftselect").textContent = shiftSelectActivated
    ? "Shift selection activated"
    : "Shift selection disabled";
}

// Initialize plugin
function initialization() {
  chrome.tabs.executeScript(
    {
      code:
        "(" + getPluginHolder + ")('" + config.scriptID + "'," + config.shiftSelectActivated + ");", //argument here is a string but function.toString() returns function's code
    },
    (results) => {
      ctx.shiftPlugin = results[0];
      ctx.shiftPlugin.onchange = function (data) {
        console.log(data);
      };
      bkg.console.log(ctx.shiftPlugin);
    }
  );
  chrome.storage.sync.get("shiftSelectActivated", function (result) {
	config.shiftSelectActivated = result.mouseLockActivated;
	onShowShiftSelectionButton();
  });
}

initialization();

document.getElementById("shiftselect").addEventListener("click", () => {
  bkg.console.log("Click shift index");
  config.shiftSelectActivated = !config.shiftSelectActivated;
  chrome.tabs.executeScript(
    {
      code: "(" + setPluginHolder + ")("+config.scriptID+","+config.shiftSelectActivated+");", //argument here is a string but function.toString() returns function's code
    },
    (results) => {
      chrome.storage.sync.set({ shiftSelectActivated: config.shiftSelectActivated }, function () {
        onShowMouseLockButton();
      });
    }
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
