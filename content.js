console.log("content.js online!");

// Contacting the service worker to know if the extension is on
(async () => {
  const response = await chrome.runtime.sendMessage({ greetings: "U on?" });
  console.log("message sent to background");

  //if response OK, do something
  console.log(response);
  focusTime();
})();

// Setting a variable that will allow to reload the pages only once when the extension is turned on/off
let reload = false;

// Creating the CSS blocking the page view
const generateSTYLES = () => {
  return `<style>@import url(https://fonts.googleapis.com/css?family=opensans:500);
  
  body {
    background: #5883e8;
    color: #fff;
    font-family: "Open Sans", sans-serif;
  }

.nope {
    text-align: center;
    padding-top: 10rem;
    font-size: 220px;
    height: 250px;
    letter-spacing: 15px;
    animation-name: spin;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 5s;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
}

@keyframes spin {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(-360deg); }
}

.getback {
    padding-top: 5rem;
}

.flyingnopes {
  text-shadow: #5883e8;
}
   </style>`;
};

const generateHTML = (pageName) => {
  return `
   
  <div class='container'>
  <div class='nope'>NOPE</div>
  <div class='get-back'>GET BACK TO WORK</div>
</div>

   `;
};

// Blocking time-consuming pages
function focusTime() {
  switch (window.location.hostname) {
    case "discord.com":
    case "www.facebook.com":
    case "outlook.live.com":
    case "mail.google.com":
    case "web.whatsapp.com":
    case "mail.google.com":
    case "lemonde.fr":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("BROWSING");
      document.addEventListener("click", () => {});
      break;
  }
}

// function refreshOnce() {
//   if (reload === false) {
//     {
//       switch (window.location.hostname) {
//         case "discord.com":
//         case "www.facebook.com":
//         case "outlook.live.com":
//         case "mail.google.com":
//         case "web.whatsapp.com":
//         case "mail.google.com":
//         case "lemonde.fr":
//           setTimeout(() => {
//             document.location.reload();
//           }, 6000);
//           break;
//       }
//     }
//   }
// }

// TO SEE LATER : function to reload all tabs, applying or suppressing the CSS :
// function reloadAllWindows() {
//   chrome.windows.getAll({}, (windows) => {
//     for (const i in windows) {
//       reloadWindow(windows[i])
//     }
//   })
// }
