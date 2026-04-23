export const logout = (navigate, setUser, showToast) => {
  localStorage.removeItem("token");

  if (setUser) setUser(null);

  showToast?.("Logged out successfully", "success", "logout");

  navigate("/login");
};