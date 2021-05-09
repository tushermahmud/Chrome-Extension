//Get current domain

chrome.runtime.sendMessage({ command: "fetch", query: "currentTime" },
    (response) => {
        showData(response.data);
    }
);

chrome.extension.onMessage.addListener(function(
    request,
    sender,
    sendResponse
) {
    console.log({ email: email });
    sendResponse({ email: email });
});
chrome.runtime.sendMessage({ command: "post", data: "Test Data" },
    (response) => {
        showData(response.data);
    }
);

var showData = function(data) {
    console.log("From Extension--", data);
};