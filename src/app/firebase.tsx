

  import { initializeApp } from "firebase/app";
  import { getAuth, GoogleAuthProvider } from "firebase/auth";
  
  const firebaseConfig = {
    apiKey: "AIzaSyAYEqjHKzl5JJXxujgymBsP7cQzXN0hP3o",
    authDomain: "proposalify-43b34.firebaseapp.com",
    projectId: "proposalify-43b34",
    storageBucket: "proposalify-43b34.appspot.com",
    messagingSenderId: "904705020895",
    appId: "1:904705020895:web:1886699817e6779204ea6a",
    measurementId: "G-2D2JWE5X67"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  
  export { auth, googleProvider };
  

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAYEqjHKzl5JJXxujgymBsP7cQzXN0hP3o",
//   authDomain: "proposalify-43b34.firebaseapp.com",
//   projectId: "proposalify-43b34",
//   storageBucket: "proposalify-43b34.appspot.com",
//   messagingSenderId: "904705020895",
//   appId: "1:904705020895:web:1886699817e6779204ea6a",
//   measurementId: "G-2D2JWE5X67"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);