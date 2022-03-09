import {getStorage} from 'firebase/storage';
import { initializeApp } from "firebase/app";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyChPhh3ixTU7EpdBeVTN2ptLIizBIDs8Sk",
    authDomain: "jhgh-9e1c7.firebaseapp.com",
    projectId: "jhgh-9e1c7",
    storageBucket: "jhgh-9e1c7.appspot.com",
    messagingSenderId: "128996790963",
    appId: "1:128996790963:web:396a7b71c8782df4ba56c6"
};
export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

