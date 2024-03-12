
// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, Analytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCho0oIkvTyIgOPiqX6kHUhFjVIKcndpto",
  authDomain: "proposalify-a6373.firebaseapp.com",
  databaseURL: "https://proposalify-a6373-default-rtdb.firebaseio.com",
  projectId: "proposalify-a6373",
  storageBucket: "proposalify-a6373.appspot.com",
  messagingSenderId: "613376731815",
  appId: "1:613376731815:web:33f285ca92a2f1633cc982",
  measurementId: "G-VMWX00F7H8"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app); // Pindahkan inisialisasi di sini

  if (analytics && typeof analytics.isSupported === 'function' && analytics.isSupported()) {
    // Pastikan analytics tidak undefined dan memiliki method isSupported sebelum memanggil
  } else {
    console.warn('Analytics is not supported in this environment.');// Lakukan operasi lain yang membutuhkan analytics di sini
  }
}

export { app, auth, analytics, googleProvider };
  
  
  // import { initializeApp } from "firebase/app";
  // import { getAuth, GoogleAuthProvider } from "firebase/auth";
  
  // const firebaseConfig = {
  //   apiKey: "AIzaSyDKlAYXJdh3INNcFwAwxhfV79rc9veJKfI",
  //   authDomain: "proposalify-2afe2.firebaseapp.com",
  //   projectId: "proposalify-2afe2",
  //   storageBucket: "proposalify-2afe2.appspot.com",
  //   messagingSenderId: "418899132397",
  //   appId: "1:418899132397:web:8998ee951318fbcd4771e4",
  //   measurementId: "G-XVQRWNTC15"
  // };
  
  // const app = initializeApp(firebaseConfig);
  // const auth = getAuth(app);
  // const googleProvider = new GoogleAuthProvider();
  
  // export { auth, googleProvider };
  

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