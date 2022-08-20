chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ url: [chrome.runtime.getURL("index.html")] }, ([e]) => {
    e
      ? chrome.tabs.highlight({ tabs: e.index })
      : chrome.tabs.create({ url: "index.html" });
  });
});
class ContextMenusItem {
  constructor(folderID = null) {
    this.children = [
      {
        title: "儲存此分頁",
        id: "thisTabs",
      },
      {
        title: "儲存全部分頁",
        id: "allTabs",
      },
      {
        title: "儲存左側分頁",
        id: "leftTabs",
      },
      {
        title: "儲存右側分頁",
        id: "rightTabs",
      },
    ];
    if (folderID) {
      this.children = this.children.map(({ title, id }) => ({
        title: title,
        id: id + "-" + folderID,
        parentId: folderID,
      }));
    }
  }
  install() {
    this.children.forEach((item) => chrome.contextMenus.create(item));
  }
}
const InstallContextMenus = (() => {
  chrome.contextMenus.removeAll(() => {
    const position = "folderList";
    new ContextMenusItem().install();
    chrome.storage.local.get(position, function (result) {
      if (!result[position]) return;
      chrome.contextMenus.create({ type: "separator", id: "folder" });
      result[position].forEach(({ label, id }) => {
        const idString = id.toString();
        chrome.contextMenus.create({ title: label, id: idString }, () => {
          new ContextMenusItem(idString).install();
        });
      });
    });
  });
})();
chrome.contextMenus.onClicked.addListener(async ({ menuItemId }, tab) => {
  const newList = "newList";
  const closeList = [];
  const stringArray = menuItemId.split("-");
  const storage = await chrome.storage.local
    .get(newList)
    .then((result) => result.newList || []);
  const pushToStorage = ({ id, title, url, favIconUrl }) => {
    if (url.includes("chrome-extension://")) return;
    storage.push({
      title,
      url,
      favIconUrl,
      folder: stringArray[1] || null,
    });
    closeList.push(id);
  };
  if (stringArray[0] === "thisTabs") {
    pushToStorage(tab);
  } else {
    const tabs = await chrome.tabs
      .query({ pinned: false, windowId: tab.windowId })
      .then((tabs) => {
        if (stringArray[0] === "allTabs") {
          return tabs;
        } else if (stringArray[0] === "leftTabs") {
          return tabs.filter((_tab) => _tab.index < tab.index);
        } else if (stringArray[0] === "rightTabs") {
          return tabs.filter((_tab) => _tab.index > tab.index);
        }
      });
    tabs.forEach((tab) => pushToStorage(tab));
  }
  chrome.storage.local
    .set({
      newList: storage,
    })
    .then(() => closeList.reverse().forEach((id) => chrome.tabs.remove(id)));
});
