//Get current domain

chrome.runtime.sendMessage({ command: "fetch", query: "currentTime" },
    (response) => {
        console.log(response.currentTime);
        showData(response.data);
    }
);

chrome.runtime.sendMessage({ command: "post", data: "Test Data" },
    (response) => {
        showData(response.data);
    }
);

var showData = function(data) {
    console.log("From Extension--", data);
};