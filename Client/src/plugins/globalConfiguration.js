var gc = {
    url: "http://localhost:2000/",
    getBaseUrl: function(path) {
        return gc.url + path;
    }
}
module.exports.install = (Vue) => {
    Vue.prototype.$gc = gc
};