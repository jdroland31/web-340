/*
============================================
; Title:  roland-assignment-1-4.js
; Author: Jonathan Roland
; Date:   10 August 2020
; Modified By:
; Description: A program demonstrating an understanding of node.js web servers
;===========================================
*/

//Variable declaration

var http = require("http");

function processRequest(req, res) {

var body = "Don't forget to bring a towel!";

    var contentLength = body.length;

    res.writeHead(200, {

        'Content-Length': contentLength,

        'Content-Type': 'text/plain'

    });

    res.end(body);

}

var s = http.createServer(processRequest);

s.listen(8080);