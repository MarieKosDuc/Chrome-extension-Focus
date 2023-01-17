console.log("content.js online!");

chrome.runtime.onMessage.addListener((msgObj) => {
  console.log(msgObj);
  if (msgObj == "Focus time: on") {
    focusTime();
  } else if (msgObj == "Focus time: off") {
    unFocus();
  }
});

// ----------- TO SEE LATER ----------------

function focusTime() {
  // lauching focus music page on YouTube : sending a message to the background

  (async () => {
    const response = await chrome.runtime.sendMessage({
      greeting: "open Youtube",
    });
    // do something with response here, not outside the function
    console.log(response);
  })();

  //blocking time-consuming pages
  switch (window.location.hostname) {
    case "www.facebook.com":
      alert("Back to work!!");
      break;
    case "discord.com":
      alert("Back to work!!");
      break;
    case "outlook.live.com":
      alert("Back to work!!");
      break;
    case "mail.google.com":
      alert("Back to work!!");
      break;
    case "web.whatsapp.com":
      alert("Back to work!!");
      break;
    case "mail.google.com":
      alert("Back to work!!");
      break;
    case "lemonde.fr":
      alert("Back to work!!");
      break;
  }
}

function unFocus() {
  alert("You can now browse at will!");

  // telling the service worker to kill tye Youtube tab (still to come)
  (async () => {
    const response = await chrome.runtime.sendMessage({
      greeting: "kill Youtube",
    });
    // do something with response here, not outside the function
    console.log(response);
  })();
}
