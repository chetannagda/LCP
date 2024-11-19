// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged} from "firebase/auth";
// import { getFirestore, doc, getDoc, addDoc, collection, setDoc, updateDoc } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyA9gxOMwffnnrYc9aeeCTShHDLi70E_QaE",
//     authDomain: "real-estate-b4204.firebaseapp.com",
//     projectId: "real-estate-b4204",
//     storageBucket: "real-estate-b4204.appspot.com",
//     messagingSenderId: "508696580377",
//     appId: "1:508696580377:web:e751c051dde0e829dbb588",
//     measurementId: "G-J3T9DGQST2"
//   };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);
// let email = null;
// let userId = null;

// export { auth, db, storage, email, userId };


// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         email = user.email.split('@')[0];
//         userId = user.uid;
//         console.log("User is signed in:"); // logging if user is authenticated
//         console.log("Email : ", email)
    
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/auth.user
//         const uid = user.uid;
//         console.log("User ID: ", uid);
//     } else {
//         email = null;
//         console.log("User is not signed in.");  // logging if user is not authenticated
//     }
//     // toggleLoginLogout();
// });

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, addDoc, collection, setDoc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9gxOMwffnnrYc9aeeCTShHDLi70E_QaE",
    authDomain: "real-estate-b4204.firebaseapp.com",
    projectId: "real-estate-b4204",
    storageBucket: "real-estate-b4204.appspot.com",
    messagingSenderId: "508696580377",
    appId: "1:508696580377:web:e751c051dde0e829dbb588",
    measurementId: "G-J3T9DGQST2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
let email = null;
let userId = null;

// Authentication state observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        email = user.email.split('@')[0];
        userId = user.uid;
        console.log("User is signed in:");
        console.log("Email: ", email);
        console.log("User ID: ", userId);
    } else {
        email = null;
        userId = null;
        console.log("User is not signed in.");
    }
});

// Function to add a new property
const addProperty = async (propertyData) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
        console.error("User is not authenticated");
        return;
    }

    const newProperty = {
        ...propertyData,
        userId,  // Associate property with the logged-in user
        dateListed: new Date()  // Automatically set the date listed
    };

    try {
        await addDoc(collection(db, "Properties"), newProperty);
        console.log("Property added successfully");
    } catch (error) {
        console.error("Error adding property: ", error);
    }
};

// Function to fetch properties for the user profile
const fetchUserProperties = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return [];

    const q = query(collection(db, "Properties"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to fetch all properties globally
const fetchAllProperties = async () => {
    const querySnapshot = await getDocs(collection(db, "Properties"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Export the necessary variables and functions
export { auth, db, storage, email, userId, addProperty, fetchUserProperties, fetchAllProperties };
