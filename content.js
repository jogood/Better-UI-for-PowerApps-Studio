var testValue = false;

document.getElementById("applycss").addEventListener("click", () => {
  console.log("Popup DOM fully loaded and parsed");
  function modifyDOM() {
    // Test
    // if (mod) {
    //   document.getElementsByClassName("authoring-shell-root")[0].style.color = "orange";
    // } else {
    //   document.getElementsByClassName("authoring-shell-root")[0].style.color = "blue";
    // }
    for (var i = 0; i < document.getElementsByClassName("root")[0].childElementCount; i++) {
      var element = document.getElementsByClassName("root")[0].children[i];
      if (element.ariaLabel) {
        console.log("_");
        var s = element.ariaLabel + "";
        // Arialabel begins with en-tête. But there is a problem with ê, so just check for en-t
        if (s.toLowerCase().indexOf("en-t") != -1) {
          console.log(element);

          element.style.display = "none";
        } else if (s.toLowerCase().indexOf("ruban") != -1) {
          console.log(element);
          element.style.top = "0px";
        } else if (s.toLowerCase().indexOf("barre de navigation lat") != -1) {
          console.log(element);
          element.style.top = "120px";
          // Arborescence
          element.children[0].children[0].children[1].style.width = "320px";
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

    console.log("Css applied");
    // Display body in page's console
    // console.log('Tab script:');
    // console.log(document.body);
    return document.body.innerHTML;
  }

  function LockComponents() {
    document.removeEventListener("mousedown", lockMouseDown, { name: "lockMouseDown" });
    document.removeEventListener("mouseup", mouseUpHandler, { name: "mouseUpHandler" });
    console.log("Lock listener activated");
    var element = null;
    var list = [
      // "click",
      // "drag",
      "mousedown",
      // "mouseup","dragenter",

      // "dragover",
      // "drop","dragbox"
    ];
    var didMouseUp = false;

    function lockMouseDown(event) {
      didMouseUp = false;
      console.log("mousedown Lock");
      console.log(event);
      console.log(event.srcElement);
      element = event.srcElement;
      element.requestPointerLock =
        element.requestPointerLock || event.srcElement.mozRequestPointerLock;
      element.requestPointerLock();
      setTimeout(() => {
        if (!didMouseUp) {
          // document.exitPointerLock = document.exitPointerLock;
          document.exitPointerLock();
          console.log("End Lock");
        }
      }, 150);
    }
    function mouseUpHandler(event) {
      console.log("Mouseup");
      setTimeout(() => {
        // if (!didMouseUp) {
        // document.exitPointerLock = document.exitPointerLock;
        didMouseUp = true;
        document.exitPointerLock();
        console.log("End Lock");
        // }
      }, 20);
      // document.exitPointerLock = document.exitPointerLock;
      // document.exitPointerLock();
    }
    // document.addEventListener(
    //   "click",
    //   function (event) {
    //     didMouseUp = false;
    //     console.log("click Lock");
    //     console.log(event);
    //     console.log(event.srcElement);
    //     element = event.srcElement;
    //     element.requestPointerLock =
    //       element.requestPointerLock || event.srcElement.mozRequestPointerLock;
    //     element.requestPointerLock();
    //     setTimeout(() => {
    //       // if (!didMouseUp) {
    //         document.exitPointerLock = document.exitPointerLock;
    //         document.exitPointerLock();
    //         console.log("End Lock");
    //       // }
    //     }, 50);
    //   },
    //   { name: "lockClick" }
    // );

    document.addEventListener("mousedown", lockMouseDown, { name: "lockMouseDown" });
    document.addEventListener("mouseup", mouseUpHandler, { name: "mouseUpHandler" });
  }
  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript(
    {
      code: "var mod = " + testValue + ";(" + modifyDOM + ")();(" + LockComponents + ")();", //argument here is a string but function.toString() returns function's code
    },
    (results) => {
      console.log("Popup script:");
      console.log(results);
    }
  );
  testValue = !testValue;
});
