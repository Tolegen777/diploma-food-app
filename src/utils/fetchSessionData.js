export const fetchSessionUser = () => {
    const user =
        localStorage.getItem("user") !== "undefined"
            ? JSON.parse(localStorage.getItem("user"))
            : localStorage.clear();

    return user;
    // return null
};

// session usermode
export const fetchSessionUserMode = () => {
    const adminMode =
        localStorage.getItem("userMode") !== "undefined"
            ? JSON.parse(localStorage.getItem("adminMode"))
            : localStorage.clear();

    return adminMode === 'true' ? adminMode : 'false';
}
