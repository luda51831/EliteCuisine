import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-7vXgyOD4TZFNKpUGmQheLpY5fQgdA64",
  authDomain: "proect-7468b.firebaseapp.com",
  projectId: "proect-7468b",
  storageBucket: "proect-7468b.appspot.com",
  messagingSenderId: "251531415961",
  appId: "1:251531415961:web:76e6230edb601a22404308"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginNavItem = document.querySelector(".login-nav-item");

onAuthStateChanged(auth, user => {
  if (user) {
    const displayName = user.displayName || user.email.split("@")[0];
    const email = user.email;
    const phone = user.phoneNumber || "";

    // Вивід у navbar
    loginNavItem.innerHTML = `
      <div class="user-info d-flex align-items-center">
        <span class="nav-link user-name">👤 ${displayName} (${email})</span>
        <a href="#" class="nav-link text-danger" id="logout-link">Вийти</a>
      </div>
    `;

    // Зберегти
    const userProfile = {
      name: displayName,
      email: email,
      phone: phone
    };
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    // Обробник виходу
    const logoutLink = document.getElementById("logout-link");
    logoutLink.addEventListener("click", async (e) => {
      e.preventDefault();
      await signOut(auth);
      localStorage.removeItem("userProfile");
      location.reload();
    });

  } else {
    loginNavItem.innerHTML = `<a class="nav-link" href="login.html">Увійти</a>`;
  }
});
