chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ url: [chrome.runtime.getURL('index.html')] }, ([tab]) => {
    if (tab) chrome.tabs.highlight({ tabs: tab.index });
    else chrome.tabs.create({ url: 'index.html' });
  });
});
