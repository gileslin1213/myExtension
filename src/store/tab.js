export default defineStore('tab', () => {
  const test = [
    {
      active: false,
      audible: false,
      autoDiscardable: true,
      discarded: false,
      favIconUrl: 'https://element-plus.org/images/element-plus-logo-small.svg',
      groupId: -1,
      height: 937,
      highlighted: false,
      id: 474,
      incognito: false,
      index: 2,
      mutedInfo: {
        muted: false,
      },
      pinned: false,
      selected: false,
      status: 'complete',
      title: 'Virtualized Select 虚拟化选择器 | Element Plus',
      url: 'https://element-plus.org/zh-CN/component/select-v2.html#%E5%A4%9A%E9%80%89',
      width: 1920,
      windowId: 1,
    },
  ];
  const currentTabs = reactive([]);

  const updateTabs = () => {
    // chrome.tabs.query({ pinned: false }, (tabs) => {
    //   currentTabs.length = 0;
    //   currentTabs.push(...tabs);
    // });
    currentTabs.push(...test);
  };
  const moveTabs = ({ id, index }) => {
    chrome.tabs.move(id, { index });
  };
  const removeTabs = (id) => {
    chrome.tabs.remove(id);
  };
  const listenerInit = () => {
    // const _listener = ['onCreated', 'onMoved', 'onRemoved', 'onUpdated'];
    // _listener.forEach((event) => {
    //   chrome.tabs[event].addListener(() => updateTabs());
    // });
    updateTabs();
  };
  return {
    currentTabs,
    listenerInit,
    updateTabs,
    moveTabs,
    removeTabs,
  };
});
