import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "creamy-delights-fzcut",
  "appId": "1:742371923202:web:305d470a5cf131300f5e1b",
  "storageBucket": "creamy-delights-fzcut.firebasestorage.app",
  "apiKey": "AIzaSyCbxDa3wrqBM40J5b5-9ekMsAjR0w0lAwY",
  "authDomain": "creamy-delights-fzcut.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "742371923202"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
