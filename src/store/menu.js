import {
  menuInitFromFireStore,
  updateMenuToFireStore,
  removeDataInFireStore,
  editDataInFireStore,
} from '@/firebase';
import { flattenDeep, findParentDeep } from '@/mixins';
import useGlobalStore from './global';

export default defineStore('menu', () => {
  const global = useGlobalStore();
  const { user } = global;
  const folderTree = reactive([]);
  const folderList = computed(() => flattenDeep(folderTree).splice(1));
  const checkList = computed(() => flattenDeep(folderTree).map((e) => e.label));
  const loadMenu = async () => {
    const _data = await menuInitFromFireStore(user);
    // folderTree.push(..._data);
    folderTree.splice(0, folderTree.length, ..._data);
  };
  const updateMenu = () => {
    updateMenuToFireStore(user, folderTree);
  };
  const folderEvent = (type, data, value) => {
    const { parent, index } = findParentDeep(folderTree, data);
    const _obj = {
      edit: () => {
        parent[index].label = value;
        editDataInFireStore(user, data, value);
      },
      create: () => {
        const _object = {
          label: value,
          id: Date.now(),
        };
        const target = parent[index];
        if (!target) {
          parent.push(_object);
        } else {
          if (!target.children) {
            target.children = [];
          }
          target.children.push(_object);
        }
      },
      remove: () => {
        parent.splice(index, 1);
        removeDataInFireStore(user, data);
      },
    };
    _obj[type]();
    updateMenu();
  };

  return {
    folderTree,
    folderList,
    checkList,
    loadMenu,
    updateMenu,
    folderEvent,
  };
});
