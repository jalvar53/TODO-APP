const express = require('express');
const app = express();

process.env.PORT = 3000;
app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);