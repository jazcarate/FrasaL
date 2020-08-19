const fs = require('fs');

const dict = require('./dictionary.json');
const translate = require('../src/lib/translate').translate;

const template = fs.readFileSync('./dist/template.html', 'utf-8')

exports.handler = async (event, context) => {
    const queryParams = new URLSearchParams(event.queryStringParameters)
    const description = translate(dict, queryParams.get("q") || "").map(translation => translation.translated || translation.original).join("");

    return {
        statusCode: 200,
        body: template
            .replace(/\$meta_description/g, `"Se traduce aproximadamente a '${description}'`)
            .replace(/\$meta_url/g, `"https://frasal.florius.com.ar/?${queryParams}"`),
    };
};