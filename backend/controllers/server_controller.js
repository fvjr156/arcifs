const path = require("node:path");
const { fileURLToPath } = require("node:url");

const server_controller = {
    GET_Test: function (req, res) {
        const __dirname = path.dirname(__filename);
        res.status(200).sendFile(path.join(__dirname, "..", "index.html"));
    },
};

module.exports = server_controller;
