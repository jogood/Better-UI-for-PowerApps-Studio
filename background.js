// var images = document.getElementsByTagName('img');
// for (var i = 0, l = images.length; i < l; i++) {
//   images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
// }

chrome.runtime.onInstalled.addListener(function () {
  console.log("Google chrome PowerApps style extension initialized");
});

let matches = ["https://us.create.powerapps.com/studio/#", "://us.create.powerapps.com/studio/#"];
chrome.tabs.onActivated.addListener(function (activeInfo) {
    setTimeout(function(){
    chrome.tabs.get(activeInfo.tabId, function(tab) {
    for (let i in matches) {
      if (tab.url.indexOf(matches[i]) != -1) {
        chrome.pageAction.show(activeInfo.tabId);
        break;
      }
    }
  });},300);
});
