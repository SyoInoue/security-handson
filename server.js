const crypto = require("crypto");
const express = require("express");
const api = require("./routes/api");
const csrf = require("./routes/csrf");
const app = express();
const port = 3000;

// テンプレートエンジンの設定
app.set("view engine", "ejs");

// CSP検証用ページにviews/csp.ejsを利用する設定を追加
app.get("/csp", (req, res) => {
  const nonceValue = crypto.randomBytes(16).toString("base64");
  res.header(
    "Content-Security-Policy",
    `script-src 'nonce-${nonceValue}' 'strict-dynamic';` +
      "object-src 'none';" +
      "base-url 'none'; " +
      "require-trusted-types-for 'script';"
  );
  res.render("csp", { nonce: nonceValue });
});

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// app.useでミドルウェア（サーバーがクライアントからのリクエストを受け取ってから、それにレスポンスを送るまでの間、特定のコードが実行される場所）を設定する
// express.staticでHTMLが置いてあるフォルダを指定する
app.use(express.static("public"));

app.use("/api", api);
app.use("/csrf", csrf);

// サーバーへgetメソッドでリクエストがあった場合の処理
app.get("/", (req, res, next) => {
  res.end("Top Page");
});
