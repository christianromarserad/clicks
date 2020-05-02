
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ clickCount: 0 }, function () {
        console.log('Count initialized to 0');
    });
});

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.event === 'click') {
            chrome.storage.local.get(['clickCount'], function (result) {
                if (result.clickCount === undefined) {
                    chrome.storage.local.set({ clickCount: 0 }, function () {
                        console.log('Count initialized to 0');
                    });
                }
                else {
                    chrome.storage.local.set({ clickCount: result.clickCount + 1 }, function () {
                        console.log(`Count is set to: ${result.clickCount + 1}`);
                    });
                }
            });
        }
    }
);