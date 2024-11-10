const express = require('express');
const { json } = require('express');
const cors = require('cors');
const router = require('./routes/routes');
const mysqldb = require('./config/mysql_database_config');

const app = express();
app.use(cors());
app.use(json());

const port = 3000;

app.use("/", router);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("[error] Internal Server Error");
});

app.listen(port, function() {

    try {
        mysqldb.sync();
        console.log('[debug][success] DB tables synchronized successfully!');
    } catch (error) {
        console.error('[debug][error] Error synchronizing tables:', error);
    }

    console.log("[server] Currently up and running");
    console.log(`http://127.0.0.1:${port}`)
})