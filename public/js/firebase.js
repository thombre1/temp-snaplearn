import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  sendPasswordResetEmail, 
  sendSignInLinkToEmail,
  isSignInWithEmailLink, 
  signInWithEmailLink 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo3ykiok30q0dsrON6MLtdLObmrwx9isk",
  authDomain: "login-form-83f89.firebaseapp.com",
  projectId: "login-form-83f89",
  storageBucket: "login-form-83f89.appspot.com",
  messagingSenderId: "999217816229",
  appId: "1:999217816229:web:c3e564cd28b7899867e34c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.language = "en";

// Google Auth Provider
const provider = new GoogleAuthProvider();

// Google Sign-In Event Listener
const googleLogin = document.getElementById("google-signin");
googleLogin.addEventListener("click", () => {
  googleLogin.disabled = true; // Disable button to prevent multiple clicks

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      // Save user details in localStorage
      localStorage.setItem("userName", user.displayName);
      localStorage.setItem("userPhoto", user.photoURL);

      console.log("User signed in:", user);

      // Redirect to logged-in page
      window.location.href = "./logged.html";
    })
    .catch((error) => {
      console.error("Error during sign-in:", error.code, error.message);
      alert("Error during sign-in: " + error.message);
    })
    .finally(() => {
      googleLogin.disabled = false; // Re-enable button
    });
});

// Forgot Password Event Listener
const forgotPassButton = document.getElementById("forgotpass");
forgotPassButton.addEventListener("click", () => {
  const email = prompt("Please enter your email to reset your password:");
  if (!email) {
    alert("Email is required to reset the password.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert(`Password reset email sent to ${email}. Check your inbox to reset your password.`);
    })
    .catch((error) => {
      console.error("Error sending password reset email:", error.code, error.message);
      alert("Error: " + error.message);
    });
});

// Handle Email Sign-In Link
if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = window.localStorage.getItem('emailForSignIn');
  
  if (!email) {
    email = window.prompt('Please provide your email for confirmation');
  }

  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      console.log("Successfully signed in with email link", result);
      window.localStorage.removeItem('emailForSignIn');
    })
    .catch((error) => {
      console.error("Error during email link sign-in:", error.message);
    });
}
