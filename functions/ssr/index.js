const fs = require('fs');

const translate = require('../../src/lib/translate').translate;
const { getDictionary } = require('../db');


exports.handler = async (event, context) => {
    const queryParams = new URLSearchParams(event.queryStringParameters);
    
    const pwd = "src/functions/ssr";
    const template = fs.readFileSync(`${pwd}/template.html`, 'utf-8');

    
    const search = queryParams.get("q");
    var description;
    if(search){
        const dict = await getDictionary();
        const translation = translate(dict, queryParams.get("q") || "").map(translation => translation.translated || translation.original).join("");
        description = `Se traduce aproximadamente a '${translation}'`;
    } else {
        description = "Descubre qué quiso decir Julio.";
    }

    return {
        statusCode: 200,
        body: template
            .replace(/\$meta_description/g, `"${description}"`)
            .replace(/\$meta_url/g, `"https://frasal.florius.com.ar/?${queryParams}"`),
    };
};