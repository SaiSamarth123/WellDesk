exports.addTask = async (req, res, pool) => {
  const { email, title } = req.body;
  try {
    const userQuery = "SELECT id FROM users WHERE email = $1";
    const userResult = await pool.query(userQuery, [email]);
    let userId;

    if (userResult.rows.length === 0) {
      const insertUserQuery =
        "INSERT INTO users (email) VALUES ($1) RETURNING id";
      const newUserResult = await pool.query(insertUserQuery, [email]);
      userId = newUserResult.rows[0].id;
    } else {
      userId = userResult.rows[0].id;
    }

    const insertTaskQuery =
      "INSERT INTO tasks (user_id, title, completed) VALUES ($1, $2, $3) RETURNING *";
    const taskResult = await pool.query(insertTaskQuery, [
      userId,
      title,
      false,
    ]);
    res.send(taskResult.rows[0]);
  } catch (err) {
    res.status(500).send({ error: "Database error" });
  }
};

exports.getTasks = async (req, res, pool) => {
  const { email } = req.query;
  try {
    const userQuery = "SELECT id FROM users WHERE email = $1";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const userId = userResult.rows[0].id;
    const tasksQuery = "SELECT * FROM tasks WHERE user_id = $1";
    const tasksResult = await pool.query(tasksQuery, [userId]);
    res.send(tasksResult.rows);
  } catch (err) {
    res.status(500).send({ error: "Database error" });
  }
};
