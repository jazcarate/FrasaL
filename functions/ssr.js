const fs = require('fs');

const dict = require('./dictionary.json');
const translate = require('../src/lib/translate').translate;


exports.handler = async (event, context) => {
    const queryParams = new URLSearchParams(event.queryStringParameters);
    
    const pwd = queryParams.get("pwd") || ".";
    console.log({ path: fs.readdirSync(pwd) });
    const template = fs.readFileSync(`${pwd}/template.html`, 'utf-8');
    
    const description = translate(dict, queryParams.get("q") || "").map(translation => translation.translated || translation.original).join("");

    return {
        statusCode: 200,
        body: template
            .replace(/\$meta_description/g, `"Se traduce aproximadamente a '${description}'`)
            .replace(/\$meta_url/g, `"https://frasal.florius.com.ar/?${queryParams}"`),
    };
};