try {
    browser.browserAction.onClicked.addListener(() => {
        browser.tabs.executeScript({ file: 'script.js', allFrames: true });
    });
} catch (e) {};

try {
    chrome.browserAction.onClicked.addListener(() => {
        chrome.tabs.executeScript({ file: 'script.js', allFrames: true });
    });
} catch (e) {};
