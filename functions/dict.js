const dict = require('./dictionary.json');

exports.handler = async () => {
    return {
        statusCode: 200,
        body: dict
    };
};