const { getDictionary } = require('./db');


exports.handler = async () => {
    const dict = await getDictionary();

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dict),
    };
};