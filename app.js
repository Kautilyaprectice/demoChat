const express = require('express');
const fs = require('fs');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/login', (req, res, next) => {
    res.send(`<form onsubmit="localStorage.setItem('username',document.getElementById('username').value)" action="/username" method="POST">
    <input type="text" name="username" id="username">
    <br>
    <button type="submit">Login</button>
    </form>`);
});

app.post('/username',(req, res, next) => {
    res.redirect('/');
});

app.get('/', (req, res, next) => {
    fs.readFile('message.txt' , {encoding: 'utf-8'}, (err , data) => {
        if(err){
            console.log(err);
            data = "No chat";
        }
        res.send(
        `${data}<form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
        <input type="text" id="message" name="message" placeholder="message">
        <input type="hidden" name="username" id="username">
        <button type="submit">Send</button></form>`
        );
    });
});

app.post('/', (req, res, next) => {
    fs.writeFile("message.txt", `${req.body.username} : ${req.body.message}`,{flag: 'a'}, (err) => {
        if (err) {
            console.log(err); 
        } else {
            res.redirect('/');
        }
    });
});

app.listen(3000); 

