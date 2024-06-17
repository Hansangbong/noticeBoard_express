//import { createConnection } from 'mysql';
const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);
const bodyparser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/test', (req, res) => { //메인 화면 제목 목록
    console.log("req입니다: ", req.method);
    connection.query('SELECT * from contents', (error, rows) => {
        if (error) throw error;
        console.log('조회된 데이터입니다 :', rows);
        res.send(rows);
    });
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.post('/test/detail', (req, res) => {  // 제목 클릭 시 글 보기
    const id = req.body.id;
    console.log("req입니다: ", req);
    console.log("요청받은 id입니다: ", id);
    connection.query('SELECT * from contents Where id = ?', [id], (error, rows) => {
        if (error) throw error;
        res.send(rows);
    })
});



app.post('/test/write', (req, res) => {
    console.log("req입니다: ", req);
    const title = req.body.title;
    const content = req.body.content;
    console.log("body입니다: ", req.body);
    let insertList = {};
    //insertList.push(req.body);
    insertList = [title, content];
    console.log("가공된 배열입니다: ", insertList);
    connection.query('insert into contents (title, content) value ( ?, ? )', insertList, (error, rows) => {
        if (error) throw error;
        res.send(rows);
    });

});





app.listen(app.get('port'), () => {
    console.log('express server  listening on port ', app.get('port'));
});

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'test',
//     password: 'gkstkdqhd!1',
//     database: 'express_db'
// });

//db.connect();


// db.query('SELECT * from content', (error, rows, fields) => {
//     if (error) throw error;
//     console.log('조회된 데이터입니다: ', rows);
// });

// db.end();