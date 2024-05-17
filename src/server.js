const express = require('express');

const server = express();
server.use(express.json());

server.get('/result/:id',(req,res) => {
    res.send(
        //getResult()
    );
});

server.post('/result',(req,res) => {
    res.send(
       // newResult(req.body)
    );
});


module.exports = { default: server}