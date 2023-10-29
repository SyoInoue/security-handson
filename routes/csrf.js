const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
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
  // CSRF検証用ページへリダイレクト
  res.redirect("/csrf_test.html");
});

module.exports = router;
