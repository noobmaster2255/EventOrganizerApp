import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDXUorVGnHv6sBy_htdMF6b8Px-a1UDrkc",
    authDomain: "eventorganizerapp-11005.firebaseapp.com",
    projectId: "eventorganizerapp-11005",
    storageBucket: "eventorganizerapp-11005.firebasestorage.app",
    messagingSenderId: "552213770952",
    appId: "1:552213770952:web:e249c73649303d788aebfd"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
