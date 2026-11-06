import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const email = document.getElementById("email");
const pass  = document.getElementById("password");
const msg   = document.getElementById("auth-msg");

document.getElementById("btn-login").onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, pass.value);
    window.location.href = "index.html";
  } catch (e) {
    msg.textContent = e.message;
  }
};

document.getElementById("btn-register").onclick = async () => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.value, pass.value);
    // Создаём профиль с ролью 'user' (правила не дадут поставить admin)
    await setDoc(doc(db, "users", cred.user.uid), {
      email: cred.user.email,
      role: "user",
      createdAt: Date.now()
    });
    window.location.href = "index.html";
  } catch (e) {
    msg.textContent = e.message;
  }
};