var express = require("express");
//const items = require("../../src/items");

var router = express.Router();

const tasks = require("../../src/tasks.js");

/* 商品一覧を取得するルーティング 
router.get("/items", function (req, res, next) {
  const itemsList = items.getListItem();
  res.send(itemsList);
});

/*１件の商品情報を取得するルーティング 
router.get("/items/:id", function (req, res, next) {
  const item = items.getItem(req.params.id);
  res.send(item);
}); */



//タスクを登録するルーティング
router.post("/tasks", async function (req, res, next) {
  const postTasks = await tasks.postTasks(req.body);
  res.send(postTasks);
});

//　タスク一覧を取得するルーティング
router.get("/tasks", async function (req, res, next) {
  const getTasks = await tasks.getTasks();
  res.send(getTasks);
});

module.exports = router;
