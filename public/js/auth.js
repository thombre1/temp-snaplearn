<script type="module">
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

    const auth = getAuth();

    // Check user's authentication 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        document.getElementById("username").textContent = user.displayName;
        document.getElementById("profile").src = user.photoURL;
      } else {
        // User is not authenticated, redirect to login page
        window.location.href = "./index.html";
      }
    });

    // Logout functionality
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          localStorage.clear(); // Clear local storage
          window.location.href = "./index.html"; // Redirect to login page
        })
        .catch((error) => {
          console.error("Error during sign-out:", error.message);
        });
    });

 

 
