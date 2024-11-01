
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import {
  Auth,
  getAuth
} from "firebase/auth";
import {
  Firestore,
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEfmVN0yn2gOIWMoIG-U7O8WmX17qyUyY",
  authDomain: "demo10-28712.firebaseapp.com",
  projectId: "demo10-28712",
  storageBucket: "demo10-28712.appspot.com",
  messagingSenderId: "333803026308",
  appId: "1:333803026308:web:0ec5797140c3868d3b8fd1",
  measurementId: "G-RNQC7Y97Z5"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics, auth, db };

