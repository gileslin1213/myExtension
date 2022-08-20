import {
  dataListener,
  addDatumToFolder,
  removeDatumFromFolder,
  editDatumInFolder,
} from '@/firebase';
import useGlobalStore from './global';

export default defineStore('list', () => {
  const global = useGlobalStore();
  const { user } = global;
  const list = reactive([]);
  const listener = ref();
  watch(
    () => global.current.folder,
    (folder) => {
      if (listener.value) listener.value();
      listener.value = dataListener(user, folder, list);
    }
  );
  const addDatum = (data) => {
    // const { id } = data;
    // chrome.tabs.remove(id);
    addDatumToFolder(user, data);
  };
  const removeDatum = (data) => {
    removeDatumFromFolder(user, data);
  };
  const editDatum = (data) => {
    editDatumInFolder(user, data);
  };
  return {
    list,
    addDatum,
    removeDatum,
    editDatum,
  };
});
