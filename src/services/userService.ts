export const userService = {
  getLocalUserEmail: () => {
    return localStorage.getItem('FOOD_APP_EMAIL') ?? ''
  },

  updateLocalUserEmail: (token: string) => {
    localStorage.setItem('FOOD_APP_EMAIL', token)
  },
};
