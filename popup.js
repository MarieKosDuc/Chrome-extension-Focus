// Getting the HTML buttons and setting their initial states

let onButton = document.getElementById("focusOn");
let offButton = document.getElementById("focusOff");

// Basic case: when first opening the extension, only the ON button can be clicked
offButton.disabled = true;

// If the extension is already fired, only the OFF button can be clicked
chrome.storage.session.get(["key"]).then((result) => {
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

    // sending a message to the background
    (async () => {
      const response = await chrome.runtime.sendMessage({ status: "on" });
      console.log("message sent");
      console.log(response);
    })();

    // saving the popup state
    chrome.storage.session.set({ key: "extensionOn" }).then(() => {
      console.log("Value is set to extension on");
    });

    // if the user clicks on the "off" button
  } else if (onButton.disabled == true) {
    // switching the buttons
    offButton.disabled = true;
    onButton.disabled = false;

    // sending a message to the background
    (async () => {
      const response = await chrome.runtime.sendMessage({ status: "off" });
      console.log(response);
    })();

    // saving the popup state
    chrome.storage.session.set({ key: "extensionOff" }).then(() => {
      console.log("Value is set to extension off");
    });
  }
}
