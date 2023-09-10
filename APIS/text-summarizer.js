const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const summarizer = async (text) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content:
          "Tell me about the great depression like a cowboy. 2 sentences or less.",
      },
    ],
  });

  console.log(completion.choices[0].message);
  return;
};

summarizer();
