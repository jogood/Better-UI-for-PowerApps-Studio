document.getElementById("applycss").addEventListener("click", () => {
  function applyCss() {
    // This can be used to make a custom panel to make user configs for UI styles
    function getPropertyByStrings(e, listString) {
      var prop = e;
      listString.map((s) => {
        var idxO = s.indexOf("[");
        if (idxO != -1) {
          var idxC = s.indexOf("]");
          var index = parseInt(s.substring(idxO+1,idxC))
          prop = prop[s.substring(0,idxO)][index];
        } else {
          prop = prop[s];
        }
      });
      return prop;
    }

    for (var i = 0; i < document.getElementsByClassName("root")[0].childElementCount; i++) {
      var element = document.getElementsByClassName("root")[0].children[i];
      if (element.ariaLabel) {
        var s = element.ariaLabel + "";
        // Arialabel begins with en-tête. But there is a problem with ê, so just check for en-t
        if (s.toLowerCase().indexOf("en-t") != -1) {
          element.style.display = "none";
        } else if (s.toLowerCase().indexOf("ruban") != -1) {
          // console.log(element);
          element.style.top = "0px";
        } else if (s.toLowerCase().indexOf("barre de navigation lat") != -1) {
          element.style.top = "120px";
          // Arborescence
          element.children[0].children[0].children[1].style.width = "320px";
          
          // // Test with getPropertyByStrings (the following works)
          // var p = getPropertyByStrings(element, [
          //   "children[0]",
          //   "children[0]",
          //   "children[1]",
          //   "style",
          // ]);
          // p.width = "320px";
          
        }
      }
    }
    // Barre de formule complete
    document.getElementsByTagName("formula-bar")[0].parentElement.parentElement.style.top = "78px";

    // Barre de champ texte de formule
    document.getElementsByClassName(
      "formula-bar-rule-container-element"
    )[0].parentElement.style.width = "1050px";
    document.getElementsByClassName(
      "formula-bar-rule-container-element"
    )[0].parentElement.parentElement.style.width = "1050px";
    // document.getElementsByClassName("formula-bar-rule-container-element")[0].style.width = "1050px";

    // Right side panel
    document.getElementsByClassName("sidebar-container")[0].style.width = "400px";
    document.getElementsByClassName("sidebar-container")[0].style.top = "-48px";
    document.getElementsByClassName(
      "react-ko-host-container"
    )[0].parentElement.parentElement.style.width = "100%";

    return document.body.innerHTML;
  }

  chrome.tabs.executeScript(
    {
      code: "(" + applyCss + ")();", //argument here is a string but function.toString() returns function's code
    },
    (results) => {
      console.log("Popup script:");
      console.log(results);
    }
  );
});
