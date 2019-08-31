const express = require('express');
const server = express(); 
const cors = require('cors')
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({message:`server listening`});
});


module.exports = server