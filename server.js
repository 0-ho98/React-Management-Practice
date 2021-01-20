const fs = require('fs'); //database.json으로 부터 데이터 베이스 환경설정 정보를 읽어야한다.
const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000; //5000포트

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

app.get('/api/customers', (req, res)=>{
  connection.query(
  'SELECT * FROM CUSTOMER',
  (err, rows, fields)=>{
      res.send(rows); //실제의 데이터는 rows이다.
  }
  )
});
//app.get의 첫 번째 인자는 path, 두 번째 인자는 callback함수로써
// 화면에 보여줄 때는 res인자를 사용하여 클라이언트한테 보내준다.
app.listen(port, () => console.log(`Listening on port ${port}`));
//app.listen(port번호, callback함수) 포트번호에 맞게 서버를 열게한다.
