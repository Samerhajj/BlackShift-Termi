import axios from "axios";

const API_KEY =process.env.REACT_APP_OPEN_API_KEY;
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: API_KEY,
  
});
const openai = new OpenAIApi(configuration);

const PROMPT = `Generate a JSON object containing definitions for a specific term in different languages. The JSON object should include conceptName, shortDefinition, and longDefinition in English, Arabic, and Hebrew.

User Input: [UserTerm]

Example Output Format:
{
  "conceptName": {
    "english": "[Term in English]",
    "arabic": "[Term in Arabic]",
    "hebrew": "[Term in Hebrew]"
  },
  "shortDefinition": {  
    "english": "[Short Definition in English]",
    "arabic": "[Short Definition in Arabic]",
    "hebrew": "[Short Definition in Hebrew]"
  },
  "longDefinition": {
    "english": "[Long Definition in English]",
    "arabic": "[Long Definition in Arabic]",
    "hebrew": "[Long Definition in Hebrew]"
  }
  
}

No need to give additional information. just the output. no need to say anything more. , and dont forget to give exact output format. with all parenthesis required`;
const sendRequest = async (userInput) => {
  try {

    
    const userPrompt=PROMPT.replace("[UserTerm]",userInput);
    console.log(userPrompt);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userPrompt },
      ],
    });
  
    const reply = completion.data.choices[0].message.content;
    return reply;
  } catch (error) {
    console.error(error);
  }
};
// const sendRequest = async (userInput) => {
//   try {
//     const userPrompt = PROMPT.replace("[UserTerm]", userInput);
//     console.log(userPrompt);
//     const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: userPrompt },
//       ],
//     });

//     const reply = completion.data.choices[0].message.content;
//     const response = JSON.parse(reply);

//     const shortDefinition = {
//       english: response.shortDefinition.english || "",
//       arabic: response.shortDefinition.arabic || "",
//       hebrew: response.shortDefinition.hebrew || "",
//     };

//     return shortDefinition;
//   } catch (error) {
//     console.error(error);
//   }
// };


export default {sendRequest};
