// var images = document.getElementsByTagName('img');
// for (var i = 0, l = images.length; i < l; i++) {
//   images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
// }

chrome.runtime.onInstalled.addListener(function () {
  console.log("Better UI for PowerApps Studio extension initialized");
});

var matches = ["https://us.create.powerapps.com/studio/", ".create.powerapps.com/studio/"];
// var pageIDList = [];
chrome.tabs.onActivated.addListener(function (activeInfo) {
    setTimeout(function(){
    chrome.tabs.get(activeInfo.tabId, function(tab) {
    for (let i in matches) {
      if (tab.url.indexOf(matches[i]) != -1 
      // && pageIDList.indexOf(activeInfo.tabId) == -1
      ) {
        // console.log(pageIDList);
        // console.log(activeInfo.tabId);
        // pageIDList.push(activeInfo.tabId);
        chrome.pageAction.show(activeInfo.tabId);
        break;
      }
    }
  });},300);
});
