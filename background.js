chrome.runtime.onInstalled.addListener(() => {
  console.log("Form Filler has been installed");

  chrome.storage.sync.set({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password",
    confirmPassword: "password",
  });
});
function executeFillForm(logMessage = false) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: fillForm,
      args: [logMessage],
    });
  });
}

chrome.commands.onCommand.addListener((command) => {
  if (command === "fill_form") {
    executeFillForm(true);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "fillForm") {
    executeFillForm();
    sendResponse({ message: "Filling the form..." });
  }
});

function fillForm(logMessage) {
  if (logMessage) {
    console.log("Filling the form...");
  }

  chrome.storage.sync.get(["name", "email", "password", "confirmPassword"], (data) => {
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');

    if (nameInput) nameInput.value = data.name || "John Doe";
    if (emailInput) emailInput.value = data.email || "johndoe@example.com";
    if (passwordInput) passwordInput.value = data.password || "password";
    if (confirmPasswordInput) confirmPasswordInput.value = data.confirmPassword || "password";
  });
}
