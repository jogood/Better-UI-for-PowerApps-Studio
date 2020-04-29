var bkg = chrome.extension.getBackgroundPage();

function getPluginHolder(scriptID, activated) {
  var pluginHolder;
  if (document.getElementById(scriptID)) {
    pluginHolder = document.getElementById(scriptID);
    return pluginHolder;
  } else {
    pluginHolder = document.createElement("div");
    pluginHolder.id = scriptID;
    pluginHolder.type = "text";
    pluginHolder.innerHTML = activated;
    // pluginHolder.onchange = function (data) {
    //   console.log("onchange");
    //   console.log(data);
    //   if (data == false) {
    //     document.removeEventListener("mousedown", mouseDown, true);
    //     document.removeEventListener("mouseup", mouseUp, true);
    //   } else {
    //     document.addEventListener("mousedown", mouseDown, true);
    //     document.addEventListener("mouseup", mouseUp, true);
    //   }
    // };
    document.body.appendChild(pluginHolder);
    return pluginHolder;
  }
}

function setPluginHolder(scriptID, value) {
	var scriptID = "pluginHolder";
	var pluginHolder = document.getElementById(scriptID);
	pluginHolder.onchange(value);
  }

function simulateCtrlClick(elem) {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
        ctrlKey: true,
		view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
};