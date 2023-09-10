const fetch = require("node-fetch");

let API_KEY = "2b3efcf930714d40b5090b67144160b3";


const getNewsURLSP = () => {
  // Return the Promise created by fetch
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;


  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default getNewsURLSP;
