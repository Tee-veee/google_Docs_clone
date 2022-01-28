import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "docs-clone-7020d.firebaseapp.com",
  projectId: "docs-clone-7020d",
  storageBucket: "docs-clone-7020d.appspot.com",
  messagingSenderId: "513662604094",
  appId: "1:513662604094:web:d61f83ebfd63b73e00926f",
};

// Initialize Firebase
// CHECK IF WE ALREADY HAVE AN APP INITIALIZED, IF SO GET APP ELSE INITIALIZE FIREBASE CONFIG
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
export { app, db };
