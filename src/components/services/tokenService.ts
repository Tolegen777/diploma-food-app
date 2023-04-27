export const tokenService = {
    getLocalAccessToken: (): string => {
        return localStorage.getItem('FOOD_USER_TOKEN') ?? '';
    },

    updateLocalTokenData: (token: string): void => {
        localStorage.setItem('FOOD_USER_TOKEN', token);
    },

    setUserData: (email: string, password: string): void => {
        localStorage.setItem("user", JSON.stringify({
            displayName: null,
            email: email,
            phoneNumber: null,
            photoURL: null,
            providerId: password,
            uid: email,
        }));
    },
};
