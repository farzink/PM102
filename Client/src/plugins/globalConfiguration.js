var gc = {
    url: "http://localhost:2000/",
    getBaseUrl: function(path) {
        return gc.url + path;
    },
    getItemByKey: function(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    saveItemByKey: function(key, value) {
        //let item = JSON.stringify(value);
        localStorage.setItem(key, value);
    }
}

module.exports.install = (Vue) => {
    Vue.prototype.$gc = gc
};