chrome.runtime.onInstalled.addListener(() =>
  console.log("Form Filler has been installed")
);

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

  const nameInput = document.querySelector('input[name="name"]');
  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const confirmPasswordInput = document.querySelector(
    'input[name="confirmPassword"]'
  );

  if (nameInput) nameInput.value = "Marek";
  if (emailInput) emailInput.value = "marek@example.com";
  if (passwordInput) passwordInput.value = "password";
  if (confirmPasswordInput) confirmPasswordInput.value = "password";
}
