import React from 'react';
import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyB4QdbAlZBxzHIMBZOIGXt9vkNMqBvdOFk",
  authDomain: "webapp-b8fa7.firebaseapp.com",
  databaseURL: "https://webapp-b8fa7.firebaseio.com",
  projectId: "webapp-b8fa7",
  storageBucket: "webapp-b8fa7.appspot.com",
  messagingSenderId: "442104778347",
  appId: "1:442104778347:web:434f32ff3b303844732b2e",
  measurementId: "G-RV6RNHWE2F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
