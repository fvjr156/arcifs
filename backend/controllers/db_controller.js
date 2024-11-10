const { Forms, Responses } = require("../models/database_model");
const { function_createHashFromString, function_getQuestionsFromJsonData, function_checkHashedFormKey } = require("./data_controller")

const function_insertFormToForms = async function(questions, formName) {
    try {
        const hashquestions = function_createHashFromString(JSON.stringify(questions));
        const form = await Forms.create({
            formName: formName,
            formKey: hashquestions
        });
        return form.formID
    } catch (error) {
        console.error('[error] An error occurred while inserting the form: ', error);
        return false;
    }
}

const function_insertFormToResponses = async function(jsonData) {
    try {
        const questions = function_getQuestionsFromJsonData(jsonData);
        const hashquestions = function_createHashFromString(JSON.stringify(questions));
        let formID = await function_checkHashedFormKey(hashquestions);

        if(!formID) {
            console.log("[info] Form not found, creating new entry...");
            formID = await function_insertFormToForms(questions, jsonData.formName);
            
            if(!formID) {
                throw new Error('[error] Failed to create new entry.');
            }

            console.log("[success] New form created with ID: ", formID);
        }

        const answerData = jsonData.answers.map(function(item) {
            return {
                questionOrder: item.questionOrder,
                answer: item.answer
            }
        });

        const response = await Responses.create({
            formID: formID,
            responseTimestamp: jsonData.responseTimestamp,
            answerData: answerData
        });

        return {
            success: true,
            formID: formID,
            isNewForm: !await function_checkHashedFormKey(hashquestions),
            response: response
        };

    } catch (error) {
        console.error('[error] Error processing form response: ', error);
        return {
            success: false,
            error: error.message
        };
    }
}

module.exports = { function_insertFormToForms, function_insertFormToResponses }