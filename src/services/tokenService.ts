export const tokenService = {
  getLocalAccessToken: () => {
    return localStorage.getItem('FOOD_APP_TOKEN') ?? ''
  },

  updateLocalTokenData: (token: string) => {
    localStorage.setItem('FOOD_APP_TOKEN', token)
  },
};
