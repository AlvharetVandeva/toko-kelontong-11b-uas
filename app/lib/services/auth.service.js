export const login = (data) => {
  if (typeof window !== 'undefined') {
    const token = `mock-token-${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(data));
  }
};

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Failed to parse user data', error);
    return null;
  }
}

export function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}