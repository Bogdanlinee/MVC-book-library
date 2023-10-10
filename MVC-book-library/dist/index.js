"use strict";
const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public/book-page'));
app.use(express.static('public/books-page'));
app.listen(port, () => {
    console.log('server is running');
});
