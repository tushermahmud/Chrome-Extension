// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDHWFiLU3KLaxspSZQteiCzvs6slKrLWew",
    authDomain: "extension-2a2f9.firebaseapp.com",
    projectId: "extension-2a2f9",
    storageBucket: "extension-2a2f9.appspot.com",
    messagingSenderId: "904361141600",
    appId: "1:904361141600:web:33ce462c35266657222a05",
    measurementId: "G-K5C5EGYFDS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);

var db = firebase.firestore();

var db = firebase.firestore();

chrome.runtime.onMessage.addListener((msg, sender, resp) => {
    if (msg.command == "post") {
        chrome.identity.getProfileUserInfo(function(userInfo) {
            console.log(userInfo);
            chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
                console.log(tabs[0].url);

                let saveUrl = tabs[0].url;
                let id = Math.floor(Math.random() * 1000009 + 1);
                db.collection("links")
                    .doc(id.toString())
                    .set({
                        link: saveUrl,
                        date: new Date(),
                        email: userInfo.email,
                    })
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                console.log(userInfo);
            });
        });
    }
    if (msg.command == "fetch") {
        var docRef = db.collection("links").doc("extension");
        docRef
            .get()
            .then(function(doc) {
                if (doc.exists) {
                    //doc.data()
                    resp({
                        type: "result",
                        status: "success",
                        data: doc.data(),
                        request: msg,
                    });
                } else {
                    //No such document!
                    resp({
                        type: "result",
                        status: "error",
                        data: "No such document!",
                        request: msg,
                    });
                }
            })
            .catch(function(error) {
                //Error getting document:",error
                resp({ type: "result", status: "error", data: error, request: msg });
            });
    }

    return true;
});