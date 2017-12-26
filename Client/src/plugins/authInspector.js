const auth = {
    isSignedIn: () => {
        const token = localStorage.getItem('authToken');
        if (token != null)
            return true
        else
            return false;
    },
    createToken: (token) => {
        localStorage.setItem("authToken", token);
    },
    isTokenExpired: () => {
        const token = localStorage.getItem('authToken');
    },
    removeToken: () => {
        localStorage.removeItem("authToken");
    },
    AH: () => {
        return { Authorization: "Bearer " + localStorage.getItem("authToken") }
    }
}




module.exports.install = (Vue) => {
    Vue.prototype.$auth = auth;
};