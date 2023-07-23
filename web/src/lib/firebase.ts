import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2VeBP6q7oNMf8t7zf0OuxBPjIz4suMQo",
  authDomain: "conceptcove-53cea.firebaseapp.com",
  projectId: "conceptcove-53cea",
  storageBucket: "conceptcove-53cea.appspot.com",
  messagingSenderId: "705082379416",
  appId: "1:705082379416:web:a53073294c5917223794ed",
  measurementId: "G-FCR3MJ9HYD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
