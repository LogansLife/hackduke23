//require dotenv
require("dotenv").config();

var Http = new XMLHttpRequest();
var endpoint = "https://extractorapi.com/api/v1/extractor";
var params = `apikey=${process.env.EXTRACTOR_API_KEY}&url=example.com`;

Http.open("GET", endpoint + "?" + params);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText);
};

console.log(process.env.EXTRACTOR_API_KEY);
