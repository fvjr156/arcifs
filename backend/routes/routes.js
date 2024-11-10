const { Router } = require('express');
const form_submission_controller = require('../controllers/form_submission_controller');
const server_controller = require('../controllers/server_controller');
const router = Router();

router.get("/healthcheck", function(req, res) {
    res.status(200).send("OK");
});
router.get("", server_controller.GET_Test);
router.get("/", server_controller.GET_Test);
router.post('/submit', form_submission_controller.submitJsonData);

module.exports = router;