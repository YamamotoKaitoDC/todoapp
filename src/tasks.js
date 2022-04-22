//新規登録処理

const mysql = require("mysql2/promise");
const config = require("../config.js");
const { patch } = require("../routes/api/index.js");

/**
* タスクを新規登録する　API
*
* @returns レスポンス　JSON
*/
postTasks = async function (body) {
    let connection = null;
    try {
      connection = await mysql.createConnection(config.dbSetting);
      //ここにSQLを記述する
      const sql =
        "INSERT INTO todoapp.t_task (task_name, deadline, category_id, priority_id) VALUES (?,?,?,?);";
      let d = [body.taskName, body.deadline, body.category, body.priority];
      const [rows, fields] = await connection.query(sql, d);

      // console.log(rows);
      return rows;
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
} ;
exports.postTasks = postTasks;


//　タスクを一覧取得する
getTasks = async function () {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.dbSetting);
        //　ここにSQLを記述する
      const sql = 
        "SELECT * FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id LEFT JOIN t_priority ON t_task.priority_id = t_priority.id;";
      const [rows, fields] = await connection.query(sql);
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};
exports.getTasks = getTasks;


//　タスクを一件取得するAPI
getTasksId = async function (id) {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.dbSetting);
        //　ここにSQLを記述する
        const sql =
          "SELECT * FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id LEFT JOIN t_priority ON t_task.priority_id = t_priority.id WHERE t_task.id = ?;";
        let d = [id];
        const [rows, fields] = await connection.query(sql,d);
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};
exports.getTasksId = getTasksId;


//　タスクを一件更新するAPI
patchTasksId = async function (id, body) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    //　ここにSQLを記述する
    const sql = 
      "UPDATE t_task SET task_name=?, deadline=?, category_id=?, task_status=?, updated_at=?,  priority_id=? WHERE id=?;";
      let d = [
        body.taskName,
        body.deadline,
        body.category,
        body.status,
        new Date(),
        body.priority,
        id,
      ];
      const [rows, fields] = await connection.query(sql, d);
      return rows;
  } catch (err) {
      console.log(err);
  } finally {
      connection.end();
  }
};
exports.patchTasksId = patchTasksId;


//　タスクを一件削除する
deleteTasksId = async function (id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    //ここにSQLを記述する
    const sql = "DELETE from t_task WHERE id = ?;";
    let d = [id];
    const [rows, fields] = await connection.query(sql, d);

    // console.log(rows);
    return rows;
  } catch (err) {
      console.log(err);
  } finally {
      connection.end();
  }
};
exports.deleteTasksId = deleteTasksId;

