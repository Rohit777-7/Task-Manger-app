// Save JWT token after login
export const saveToken = (token: string): void => {
  localStorage.setItem("token", token);
};

// Get token (used in axios interceptor)
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// Check if user is logged in
export const isAuthenticated = (): boolean => {
  return Boolean(localStorage.getItem("token"));
};

// Logout user
export const logout = (): void => {
  localStorage.removeItem("token");
};
