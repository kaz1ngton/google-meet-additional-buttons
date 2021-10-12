chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.executeScript({ file: 'script.js', allFrames: true });
});
