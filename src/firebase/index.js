// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocFromServer,
  getDocsFromServer,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dataListener = (user, folder, array) => {
  const { label } = folder;
  const test = doc(db, user, 'menu');
  const ref = collection(db, `${user}/folder/children`);
  const q = query(ref, where('folder', '==', label === '未分類' ? '' : folder));
  // const snap = onSnapshot(label === '全部' ? ref : q, (Snapshot) => {
  //   array.splice(0);
  //   Snapshot.forEach((document) => {
  //     const _obj = document.data();
  //     _obj.docId = document.id;
  //     array.push(_obj);
  //   });
  //   array.sort((a, b) => a.time - b.time);
  // });
  // const snap = onSnapshot(test, (Snapshot) => {
  //   console.log(Snapshot.data());
  // });
  const unsub = onSnapshot(
    doc(db, 'giles', 'menu'),
    { includeMetadataChanges: true },
    (_doc) => {
      console.log('Current data: ', _doc.data());
    }
  );
  console.log('test');
  return unsub;
};
const addDatumToFolder = (user, data) => {
  const _obj = data;
  _obj.time = Date.now();
  if (_obj.label === '未分類') _obj.folder = '';
  delete _obj.id;
  addDoc(collection(db, `${user}/folder/children`), _obj);
};
const removeDatumFromFolder = (user, { docId }) => {
  deleteDoc(doc(db, `${user}/folder/children`, docId));
};
const editDatumInFolder = (user, data) => {
  updateDoc(doc(db, `${user}/folder/children`, data.docId), data);
};
// menu
const menuInitFromFireStore = async (user) => {
  let data = {};
  const docRef = doc(db, user, 'menu');
  const docSnap = await getDocFromServer(docRef);
  if (docSnap.exists()) {
    data = docSnap.data();
  } else {
    data = {
      folderTree: [],
    };
    setDoc(docRef, data);
  }
  const _default = [
    { label: '全部', id: 'all' },
    { label: '未分類', id: 'null' },
  ];
  return [..._default, ...data.folderTree];
};
const updateMenuToFireStore = (user, data) => {
  const docRef = doc(db, user, 'menu');
  updateDoc(docRef, { folderTree: data.slice(2, data.length) });
};
const removeDataInFireStore = (user, folder) => {
  const ref = collection(db, `${user}/folder/children`);
  const q = query(ref, where('folder', '==', folder));
  getDocsFromServer(q).then((snapshot) => {
    snapshot.forEach((e) => deleteDoc(doc(ref, e.id)));
  });
};
const editDataInFireStore = (user, folder, value) => {
  const ref = collection(db, `${user}/folder/children`);
  const q = query(ref, where('folder', '==', folder));
  const obj = {
    folder: {
      id: folder.id,
      label: value,
    },
  };
  getDocsFromServer(q).then((snapshot) => {
    snapshot.forEach((e) => updateDoc(doc(ref, e.id), obj));
  });
};
// tag
export {
  dataListener,
  addDatumToFolder,
  removeDatumFromFolder,
  editDatumInFolder,
  menuInitFromFireStore,
  updateMenuToFireStore,
  removeDataInFireStore,
  editDataInFireStore,
};
