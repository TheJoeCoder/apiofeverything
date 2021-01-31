class RestAPI {
    app;
    constructor(app) {
        this.app = app;
    }
    enable(moduleInfo, url = "/", callback = function (req, res) {}) {
        this.app.get("/api/" + moduleInfo["name"] + url, callback);
    }
}

module.exports = { RestAPI };