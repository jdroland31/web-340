var url = require("url");

var parsedURL = url.parse("https://www.awesome.com/user?userName=roland");

console.log(parsedURL.protocol);

console.log(parsedURL.host);

console.log(parsedURL.query);