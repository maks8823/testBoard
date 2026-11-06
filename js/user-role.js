import { auth } from "./firebase-config.js";

const SUPER_ADMIN_UID = "mkHQpDkqtJfIz6ZJ3AJlUiBvCFF2";

export function isAdmin(user) {
  return user && user.uid === SUPER_ADMIN_UID;
}