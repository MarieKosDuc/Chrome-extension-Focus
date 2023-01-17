console.log("Service worker online!");

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log("Message received: ", message);
  // 2. A page requested user data, respond with a copy of `user`
  if (message.greeting === "open Youtube") {
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
    return true;
  }
  if (message.greeting === "kill Youtube") {
    console.log("Browse at will");

    //changing the extension badge
    chrome.action.setBadgeText({
      text: "OFF",
    });
    return true;
  }
  return true;
});
