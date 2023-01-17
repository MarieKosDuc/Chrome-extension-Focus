// Getting the HTML buttons and setting their initial states

let onButton = document.getElementById("focusOn");
let offButton = document.getElementById("focusOff");

// Basic case: when first opening the extension, only the ON button can be clicked
offButton.disabled = true;

// If the extension is already fired, only the OFF button can be clicked
chrome.storage.local.get(["key"]).then((result) => {
  if (result.key == "extensionOn") {
    onButton.disabled = true;
    offButton.disabled = false;
  } else if (result.key == "extensionOff") {
    onButton.disabled = false;
    offButton.disabled = true;
  }
});

// Adding event listeners to the buttons
onButton.addEventListener("click", switchButtons);
offButton.addEventListener("click", switchButtons);

function switchButtons() {
  // if the user clicks on the "on" button
  if (onButton.disabled == false) {
    // switching the buttons
    offButton.disabled = false;
    onButton.disabled = true;

    // saving the popup state
    chrome.storage.local.set({ key: "extensionOn" }).then(() => {
      console.log("Value is set to extension on");
    });

    // sending a message to the content
    let msgObj = "Focus time: on";
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, msgObj);
      });
    });

    // if the user clicks on the "off" button
  } else if (onButton.disabled == true) {
    // switching the buttons
    offButton.disabled = true;
    onButton.disabled = false;

    // saving the popup state
    chrome.storage.local.set({ key: "extensionOff" }).then(() => {
      console.log("Value is set to extension off");
    });

    // sending a message to the content
    let msgObj = "Focus time: off";
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, msgObj);
      });
    });
  }
}

// // getting the checkbox from the HTML
// let checkBox = document.getElementById("checkbox");
// checkBox.addEventListener("change", userCheck);

// // getting the checkox state (on/off)
// function userCheck() {
//   if (checkBox.checked) {
//     // console.log("check !");

//     // sending a message to the content
//     let msgObj = "Focus time: on";
//     chrome.tabs.query({}, (tabs) => {
//       tabs.forEach((tab) => {
//         chrome.tabs.sendMessage(tab.id, msgObj);
//       });
//     });
//   } else {
//     // console.log("Nope");

//     // sending a message to the content
//     let msgObj = "Focus time: off";
//     chrome.tabs.query({}, (tabs) => {
//       tabs.forEach((tab) => {
//         chrome.tabs.sendMessage(tab.id, msgObj);
//       });
//     });
//   }
// }
