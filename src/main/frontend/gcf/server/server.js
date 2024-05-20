const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// CORS 설정
app.use(cors());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  port:3307,
  user: 'root',
  password: '1234',
  database: 'gcf'
});

// MySQL 연결
db.connect(err => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    return;
  }
  console.log('MySQL에 연결되었습니다.');
});

// 데이터 가져오기 notice API 엔드포인트
app.get('/api/notices', (req, res) => {
  const sql = 'SELECT id, author, created_at, views, content, title FROM notice';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
