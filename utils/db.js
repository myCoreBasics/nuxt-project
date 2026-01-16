import mysql from 'mysql2/promise';

let pool;

export const getDbPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: '125.133.91.90',   // DB 서버 IP
      port: 3400,              // 포트
      user: 'webmaster',       // DB 계정
      password: '12345',       // DB 비밀번호
      database: 'webdev',      // 사용할 DB
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
};