export default defineStore('global', {
  state: () => ({
    user: 'giles',
    current: {
      folder: {
        label: '未分類',
        id: 'null',
      },
      tags: [],
    },
  }),
  actions: {
    getUser() {
      chrome.identity.getProfileUserInfo((userInfo) => {
        this.user = userInfo.id;
      });
    },
    changeFolder({ label, id }) {
      this.current.folder = { label, id };
    },
    removeTag(index) {
      this.current.tags.splice(index, 1);
    },
  },
});
