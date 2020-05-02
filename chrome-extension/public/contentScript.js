window.addEventListener('click', () => {
    chrome.runtime.sendMessage({ event: "click" });
})