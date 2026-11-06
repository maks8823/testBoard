import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const msg = document.getElementById("auth-msg");
const emailEl = document.getElementById("email");
const passEl  = document.getElementById("password");

// ============ РЕГИСТРАЦИЯ ============
document.getElementById("btn-register").onclick = async () => {
  const email = emailEl.value.trim();
  const pass  = passEl.value;

  if (!email || !pass) { msg.textContent = "Заполни всё"; return; }
  if (pass.length < 6) { msg.textContent = "Пароль минимум 6 символов"; return; }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);

    // Создаём профиль в Firestore (пока юзер залогинен, чтобы rules пропустили)
    await setDoc(doc(db, "users", cred.user.uid), {
      email: cred.user.email,
      role: "user",
      createdAt: Date.now()
    });

	const basePath = window.location.pathname.replace(/\/[^/]*$/, "/");
	const returnUrl = window.location.origin + basePath + "login.html";

	await sendEmailVerification(cred.user, { url: returnUrl });
    await signOut(auth);

    msg.textContent = "✅ Проверьте почту. Кликните по ссылке для подтверждения, потом войдите.";
  } catch (e) {
    msg.textContent = "Ошибка: " + e.message;
  }
};

// ============ ВХОД ============
document.getElementById("btn-login").onclick = async () => {
  const email = emailEl.value.trim();
  const pass  = passEl.value;

  if (!email || !pass) { msg.textContent = "Заполни всё"; return; }

  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);

    // Обновляем данные юзера (emailVerified обновляется с сервера)
    await cred.user.reload();

    if (!cred.user.emailVerified) {
      msg.textContent = "Подтвердите email. Проверьте почту.";
      await signOut(auth);
      return;
    }

    // Проверим — создан ли профиль (если старый юзер)
    const snap = await getDoc(doc(db, "users", cred.user.uid));
    if (!snap.exists()) {
      await setDoc(doc(db, "users", cred.user.uid), {
        email: cred.user.email,
        role: "user",
        createdAt: Date.now()
      });
    }

    window.location.href = "index.html";
  } catch (e) {
    msg.textContent = "Ошибка: " + e.message;
  }
};