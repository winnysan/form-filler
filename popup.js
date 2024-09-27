document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["name", "email", "password", "confirmPassword"], (data) => {
    document.getElementById("name").value = data.name || "John Doe";
    document.getElementById("email").value = data.email || "johndoe@example.com";
    document.getElementById("password").value = data.password || "password";
    document.getElementById("confirmPassword").value = data.confirmPassword || "password";
  });

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      chrome.storage.sync.set({ name, email, password, confirmPassword });
    });
  });

  document.getElementById("fillForm").addEventListener("click", () => {
    chrome.runtime.sendMessage({ message: "fillForm" }, (response) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];

        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          func: (message) => console.log(message),
          args: [response.message],
        });
      });
    });
  });
});
