const { function_insertFormToResponses } = require("./db_controller");

const form_submission_controller = {
    submitJsonData: async function(req, res) {
        try {
            const result = await function_insertFormToResponses(req.body);
            
            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: result.isNewForm ? '[success] New form created and response submitted' : '[success] Response recorded for existing form',
                    formID: result.formID,
                    responseData: result.response
                });
            } else {
                return res.status(400).json({
                    success: false,
                    error: result.error
                });
            }
        } catch (error) {
            console.error("[error] Error processing form submission: ", error);
            return res.status(500).json({
                success: false,
                error: 'Internal Server Error'
            });
        }
    }
};

module.exports = form_submission_controller;