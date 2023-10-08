const express = require("express");
const router = express.Router();

// Getメソッドでリクエストを受け取った時の処理
router.get("/", (req, res) => {
  res.send({ message: "Hello" });
});

// ブラウザからjsonデータを受け取るための設定
router.use(express.json());
router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  res.end();
});

module.exports = router;
