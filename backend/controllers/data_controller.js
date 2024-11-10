const crypto = require('crypto');
const { Forms } = require('../models/database_model');

const function_getQuestionsFromJsonData = function (jsonData) {
    const questions = jsonData.answers.map( function(item) {
        return {
            question: item.question,
            questionOrder: item.questionOrder
        }
    });
    return questions;
} 

const function_createHashFromString = function (inputStr) {
    return crypto.createHash('sha256').update(inputStr).digest('hex');
}

const function_compareHashes = function (hash1, hash2) {
    return hash1 === hash2;
}

const function_checkHashedFormKey = async function(hashstring) {
    try {
        const form = await Forms.findOne({
            where: {
                formKey: hashstring
            }
        });
        return form ? form.formID : false;
    } catch (error) {
        console.error("[error] An error occurred while hashing form key: ", error);
        return false;
    }
}

module.exports = { function_compareHashes, function_createHashFromString, function_getQuestionsFromJsonData, function_checkHashedFormKey };