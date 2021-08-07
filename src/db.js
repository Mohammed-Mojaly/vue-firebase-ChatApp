import firebase from "firebase/app";
import "firebase/database";
var firebaseConfig = {
    apiKey: "AIzaSyDiICvNtmHA59GdM6G1uTsJUWl9bICYsbQ",
    authDomain: "vue-chat-649b6.firebaseapp.com",
    projectId: "vue-chat-649b6",
    storageBucket: "vue-chat-649b6.appspot.com",
    messagingSenderId: "816198389780",
    appId: "1:816198389780:web:834f5d095db2c0d61f1701",
    databaseURL:
    "https://vue-chat-649b6-default-rtdb.europe-west1.firebasedatabase.app/",
  };
  const db = firebase.initializeApp(firebaseConfig);

  export default db;