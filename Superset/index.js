import fs from 'fs';

import translate from '@iamtraction/google-translate';
const options = { to: 'vi' }; 
const messagesJson = JSON.parse(fs.readFileSync('./enLang.json'));

async function translateJson(jsonObject) {
    if(jsonObject && Object.keys(jsonObject).length > 0){
        for (const element of Object.keys(jsonObject)) { 
            if(typeof jsonObject[element] === 'object' && !Array.isArray(jsonObject[element])){
                await translateJson(jsonObject[element]);
            }
            else{
                if(typeof jsonObject[element] === "string" && jsonObject[element].indexOf('{') > -1 && jsonObject[element].indexOf('}') > -1){
                    continue;
                }
                let res = await translate(jsonObject[element], options);
                console.log(jsonObject[element], ":", res.text);
                jsonObject[element] = res.text;
            }
        };
    }
}

await translateJson(messagesJson);

var jsonContent = JSON.stringify(messagesJson);
fs.writeFile("enLangOutput.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }     
    console.log("JSON file has been saved.");
});