const express = require('express');
const seed = require('./mock-data');
var cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8002;

app.use(cors({
  origin: true,
  credentials: true,
}));

app.get('*', (req, res) => {
	res.send(seed);
});

app.listen(PORT, ()=>{
    console.log('Listening on port: ', PORT);
});


