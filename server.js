const crypto = require("crypto");
const express = require("express");
const api = require("./routes/api");
const csrf = require("./routes/csrf");
const app = express();
const port = 3000;

// テンプレートエンジンの設定
app.set("view engine", "ejs");

app.use(
  express.static("public", {
    setHeaders: (res, path, stat) => {
      res.header("X-Frame-Options", "SAMEORIGIN");
    },
  })
);

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

app.use(express.urlencoded({ extended: true }));

app.post("/signup", (req, res) => {
  console.log(req.body);
  res.send("アカウント登録しました");
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
