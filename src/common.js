var bkg = chrome.extension.getBackgroundPage();

function getOrCreatePluginHolder(scriptID, activated, onchange) {
  console.log("in");
  var pluginHolder;
  if (document.getElementById(scriptID)) {
    pluginHolder = document.getElementById(scriptID);
    console.log("Found");
    return pluginHolder;
  } else {
      console.log("create");
    pluginHolder = document.createElement("div");
    pluginHolder.id = scriptID;
    pluginHolder.type = "text";
    pluginHolder.innerHTML = activated;
    pluginHolder.onchange = onchange;
    document.body.appendChild(pluginHolder);
    return pluginHolder;
  }
}

function setPluginHolder(scriptID, value) {
  var pluginHolder = document.getElementById(scriptID);
  pluginHolder.onchange(value);
}

function removePlugin(scriptID) {
    console.log("Remove " + scriptID);
  var pluginHolder = document.getElementById(scriptID);
  if (pluginHolder != null) {
    if (pluginHolder.onchange != null) pluginHolder.onchange(false);
    pluginHolder.remove();
  }
}

function simulateCtrlClick(elem) {
  // Create our event (with options)
  var evt = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    ctrlKey: true,
    view: window,
  });
  // If cancelled, don't dispatch our event
  var canceled = !elem.dispatchEvent(evt);
}
