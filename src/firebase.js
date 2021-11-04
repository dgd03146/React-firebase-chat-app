import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBHN2PUahAU7_IgJ_tBxhJwR9CrTVwT3rk',
  authDomain: 'react-firebase-chat-app-7207e.firebaseapp.com',
  projectId: 'react-firebase-chat-app-7207e',
  storageBucket: 'react-firebase-chat-app-7207e.appspot.com',
  messagingSenderId: '467637399822',
  appId: '1:467637399822:web:34c450ef017710532b675f',
  measurementId: 'G-0KD7F3KQ2V',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;
