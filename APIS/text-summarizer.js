const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";


const apikey = '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'
const summarizer = async (text) => {
  try {
    const response = await fetch(OPENAI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apikey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Can you provide a 3-sentence summary of the following text as if the readers had no prior information? \n\n${text}` }
        ],
      }),
    });

    const data = await response.json();
    const messageContent = data.choices[0].message.content;
    return messageContent;
  } catch (err) {
    console.log(err);
    return null;
  }
};
module.exports = { summarizer };