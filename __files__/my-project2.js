require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my project');
});

app.listen(port, () => console.log(`my project2 app listening on port ${port}!`))