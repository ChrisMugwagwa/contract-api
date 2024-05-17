import express from "express";

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

export default server;