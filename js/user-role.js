import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export const SUPER_ADMIN_UID = "mkHQpDkqtJfIz6ZJ3AJlUiBvCFF2";

export function isSuperAdmin(user) {
  return Boolean(user && user.uid === SUPER_ADMIN_UID);
}

export async function isAdmin(user) {
  if (!user) return false;
  if (isSuperAdmin(user)) return true;
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    return snap.exists() && snap.data().role === "admin";
  } catch {
    return false;
  }
}