document.addEventListener("DOMContentLoaded", () => {
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
