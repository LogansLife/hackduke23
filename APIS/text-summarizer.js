OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";


const apikey = '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'

const summarizerAndQuestionGenerator = async (text) => {
  try {
    // First, generate the summary
    let response = await fetch(OPENAI_API_ENDPOINT, {
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
    const summary = data.choices[0].message.content;

    // Now, generate a question based on the summary
    response = await fetch(OPENAI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apikey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Can you generate a question based on this summary? \n\n${summary}` }
        ],
      }),
    });

    const questionData = await response.json();
    const question = questionData.choices[0].message.content;

    // Store the question (in this example, just adding to an array)
    questionsStore.push(question);

    return { summary, question };

  } catch (err) {
    console.log(err);
    return null;
  }
};

// An in-memory store for questions. In a real-world scenario, this should be a database.
const questionsStore = [];


module.exports = { summarizerAndQuestionGenerator, questionsStore };
