const openai = require("openai");

const API_KEY = process.env.GPT_KEY;
const openaiConfig = new openai.Configuration({
  apiKey: API_KEY,
});
const openaiApi = new openai.OpenAIApi(openaiConfig);

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

const generateDefinitions = async (req, res) => {
  try {
    const userInput = req.body.userInput;
    const userPrompt = PROMPT.replace("[UserTerm]", userInput);

    const completion = await openaiApi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userPrompt },
      ],
    });

    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { generateDefinitions };
