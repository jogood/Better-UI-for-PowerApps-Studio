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

  function pluginOnChange(data, scriptID) {
    console.log(data);
    var listAttrName = "data-list-index";
    var listEle = document.body.getElementsByClassName("ms-List-surface")[0];
    // listElement.add
    var lastClickedElement = null; // The last element receiving a click without shift pressed down.

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

    function findIndexOf(element, i = 0) {
      if (i > 5 || element == null) {
        return null;
      }
      var idx = element.getAttribute(listAttrName);
      if (idx != null) {
        return parseInt(idx);
      }
      return findIndexOf(element.parentElement, i++);
    }

    function getListElements() {
      var list = [];
      Array.from(listEle.children).map((gr) => {
        Array.from(gr.children).map((e) => {
          list.push(e);
        });
      });
      return list;
    }

    function onListClick(event) {
      // console.log(event);
      if (event.shiftKey && lastClickedElement != null) {
        var toElement = event.path[0];
        var indexFrom = findIndexOf(lastClickedElement); 
        var indexTo = findIndexOf(toElement); 
        var list = getListElements();
        var first;
        var last;
        if (indexTo > indexFrom) {
          first = indexFrom;
          last = indexTo;
        } else {
          first = indexTo;
          last = indexFrom;
        }
        list.map((e) => {
          var idx = parseInt(e.getAttribute(listAttrName));
          if (idx > first && idx < last) {
            simulateCtrlClick(e.children[0]);
          }
        });
      } else {
        // console.log(event.path[0]);
        lastClickedElement = event.path[0];
      }
    }

    pluginHolder = document.getElementById(scriptID);
    pluginHolder.onchange = function (d) {
      console.log("onchange shift");
      console.log(d);
      var listElement = document.body.getElementsByClassName("ms-List-surface")[0];
      console.log(listElement);
      if (d == false) {
        listElement.removeEventListener("click", onListClick, true);
      } else {
        listElement.addEventListener("click", onListClick, true);
      }
    };
    pluginHolder.onchange(data);
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
          bkg.console.log("Initialized plugin holder (shift select)");
          bkg.console.log(results);
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
          onShowShiftSelectionButton();
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
}
shiftselection();
