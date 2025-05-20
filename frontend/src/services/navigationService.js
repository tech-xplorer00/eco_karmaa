// This service allows navigation from outside React components
let navigate = null;

export const setNavigate = (navigateFunction) => {
  navigate = navigateFunction;
};

export const getNavigate = () => {
  return navigate;
};

// Helper methods for common navigation
export const goToLogin = () => {
  if (navigate) {
    navigate('/login');
  }
};

export const goToDashboard = () => {
  if (navigate) {
    navigate('/dashboard');
  }
};

export default {
  setNavigate,
  getNavigate,
  goToLogin,
  goToDashboard
}; 