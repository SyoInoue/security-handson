const express = require("express");
const router = express.Router();

// Getメソッドでリクエストを受け取った時の処理
router.get("/", (req, res) => {
  res.setHeader("X-Timestamp", Date.now());
  let message = req.query.message;
  const lang = req.headers["x-lang"];

  if (message === "") {
    res.status(400);
    if (lang === "en") {
      message = "message is empty.";
    } else {
      message = "messageの値が空です";
    }
  }
  res.send({ message });
});

// ブラウザからjsonデータを受け取るための設定
router.use(express.json());
router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  res.end();
});

module.exports = router;
