const fetch = require("node-fetch");

let API_KEY = "700901d27e0a4dffbc1f8f7749e79cbf";

let url =
  "https://newsapi.org/v2/top-headlines?" + "country=us&" + `apiKey=${API_KEY}`;

const getNewsURLS = () => {
  // Return the Promise created by fetch
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default getNewsURLS;
