const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000; //5000포트

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res)=>{
  res.send([
    {
      id: 1,
      image: "https://placeimg.com/64/64/1",
      name: "박건형",
      birthday: "980216",
      gender: "남자",
      job: "대학생",
    },
    {
      id: 2,
      image: "https://placeimg.com/64/64/2",
      name: "강하늘",
      birthday: "980414",
      gender: "여자",
      job: "프로그래머",
    },
    {
      id: 3,
      image: "https://placeimg.com/64/64/3",
      name: "지석환",
      birthday: "980822",
      gender: "남자",
      job: "엔지니어",
    },
  ]);
});
//app.get의 첫 번째 인자는 path, 두 번째 인자는 callback함수로써
// 화면에 보여줄 때는 res인자를 사용하여 클라이언트한테 보내준다.
app.listen(port, () => console.log(`Listening on port ${port}`));
//app.listen(port번호, callback함수) 포트번호에 맞게 서버를 열게한다.
