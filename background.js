console.log("Service worker online!");

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "Work?",
  });
});

// Saving the extension's status

let extOnline = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log("Message received: ", message);
  // 2. A page requested user data, respond with a copy of `user`
  if (message.status === "on") {
    console.log("Opening Youtube");
    var newURL =
      "https://www.youtube.com/watch?v=sXC6AUbY69A&ab_channel=GreenredProductions-RelaxingMusic";
    chrome.tabs.create({ url: newURL });
    let resp = "Youtube opened";
    sendResponse(resp);

    //changing the extension badge
    chrome.action.setBadgeText({
      text: "ON",
    });

    // changing the status variable
    extOnline = true;
    return true;
  }
  if (message.status === "off") {
    console.log("Browse at will");

    //changing the extension badge
    chrome.action.setBadgeText({
      text: "OFF",
    });

    // changing the status variable
    extOnline = false;

    return true;
  }
  return true;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // checking the extension status
  chrome.storage.local.get(["key"]).then((result) => {
    if (result.key == "extensionOn") {
      extOnline = true;
    } else if (result.key == "extensionOff") {
      extOnline = false;
    }
    console.log("Extension status :", extOnline);
  });

  // if the extension is on, respond to the content to fire the CSS
  if (message.greetings === "U on?" && extOnline) {
    sendResponse("extension is on");
    return true;
  }
  return true;
});
