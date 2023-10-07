const express = require("express");
const app = express();
const port = 3000;

// サーバーへgetメソッドでリクエストがあった場合の処理
app.get("/", (req, res, next) => {
  res.end("Top Page");
});

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// app.useでミドルウェア（サーバーがクライアントからのリクエストを受け取ってから、それにレスポンスを送るまでの間、特定のコードが実行される場所）を設定する
// express.staticでHTMLが置いてあるフォルダを指定する
app.use(express.static("public"));
