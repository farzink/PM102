const auth = {
    isSignedIn: () => {
        const token = localStorage.getItem('authToken');
        console.log(token);
    },
    createToken: (token) => {
        localStorage.setItem("authToken", token);
    },
    isTokenExpired: () => {
        const token = localStorage.getItem('authToken');
    }
}




module.exports.install = (Vue) => {
    Vue.prototype.$authInspector = auth;
};