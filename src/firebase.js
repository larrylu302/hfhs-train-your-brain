// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCvemJq28UzuiWiGAk6Glh4p4NdjCgiedU',
  authDomain: 'hfhs-brain-training.firebaseapp.com',
  projectId: 'hfhs-brain-training',
  storageBucket: 'hfhs-brain-training.appspot.com',
  messagingSenderId: '749908110871',
  appId: '1:749908110871:web:15d6148f66047130a5b652',
  measurementId: 'G-P6PP7YLLPN',
};

export default function initFirebase() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
}
