const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const router = express.Router();

/**
 * セッション管理の設定
 */
router.use(
  session({
    secret: "session",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: false, maxAge: 60 * 1000 * 5 },
  })
);

router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

let sessionData = {};

router.post("/login", (req, res) => {
  // 検証用のため、ユーザ名とパスワードは固定
  const { username, password } = req.body;
  if (username !== "user1" || password !== "Passw0rd!#") {
    res.status(403);
    res.send("ログインに失敗しました");
    return;
  }
  // セッションにユーザ名を保存
  sessionData = req.session;
  sessionData.username = username;
  const token = crypto.randomUUID();
  res.cookie("csrf_token", token, { secure: true });
  // CSRF検証用ページへリダイレクト
  res.redirect("/csrf_test.html");
});

router.post("/remit", (req, res) => {
  // セッションに保存した情報からログイン済みかを確認する
  if (!req.session.username || req.session.username !== sessionData.username) {
    res.status(403);
    res.send("ログインしていません");
    return;
  }
  if (req.cookies["csrf_token"] !== req.body["csrf_token"]) {
    res.status(400);
    res.send("不正なリクエストです。");
    return;
  }
  // 本来はデータベースの書き換えなど重要な処理が行われる
  const { to, amount } = req.body;
  res.send(`${to}に${amount}円送金しました`);
});

module.exports = router;
