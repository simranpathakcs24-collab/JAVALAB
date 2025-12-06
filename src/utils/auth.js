export function saveAuth(userObj) {
  localStorage.setItem("token", userObj.token);
  localStorage.setItem("user", JSON.stringify({
    _id: userObj._id,
    username: userObj.username,
    role: userObj.role,
    email: userObj.email
  }));
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getUser() {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
}
