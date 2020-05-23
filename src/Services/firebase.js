import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCHyhZgiRs5H2qCr-SIkZFRKz3zyKWM3GQ",
    authDomain: "webapp-7746c.firebaseapp.com",
    databaseURL: "https://webapp-7746c.firebaseio.com",
    projectId: "webapp-7746c",
    storageBucket: "webapp-7746c.appspot.com",
    messagingSenderId: "807056563194",
    appId: "1:807056563194:web:4e4fd9ca7d3b463c9da243"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;