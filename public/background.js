chrome.action.onClicked.addListener(() => {
  chrome.tabs.query(
    {
      url: [chrome.runtime.getURL("index.html")],
    },
    ([tab]) => {
      tab
        ? chrome.tabs.highlight({ tabs: tab.index })
        : chrome.tabs.create({ url: "index.html" });
    }
  );
});