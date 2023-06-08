export const userService = {
  getLocalUserEmail: () => {
    return localStorage.getItem('FOOD_APP_EMAIL') ?? ''
  },

  updateLocalUserEmail: (token: string) => {
    localStorage.setItem('FOOD_APP_EMAIL', token)
  },

  getRestId: () => {
    const restId = localStorage.getItem('REST_ID_ID') ?? ''
    return parseInt(restId, 10)
  },

  updateRestId: (id: number | string) => {
    localStorage.setItem('REST_ID_ID', id.toString())
  },

};
