//import openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const summarizer = async text => {
  const completion = await openai.completions.create({
    model: 'davinci-002',
    prompt: 'Write a tagline for an ice cream shop.',
  });
  console.log(completion.text);
  return;
};

export default summarizer;
