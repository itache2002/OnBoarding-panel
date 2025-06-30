const express        = require('express');
require('dotenv').config();

const usersRouter    = require('./Routes/users');
const apiKeysRouter  = require('./Routes/apiKey');
const apiKeyAuth     = require('./middleware/apiKeyAuth');
const db             = require('./Services/db');

const app = express();
app.use(express.json());

// ---- public routes ----
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/keys',  apiKeysRouter);

app.get('/api/v1/hello', apiKeyAuth, async (req, res, next) => {
  try {
    const { rows: [u] } = await db.query(
      'SELECT name FROM users WHERE id = $1',
      [req.userId]
    );

    res.json({ message: `Hello, ${u ? u.name : 'friend'}!` });
  } catch (err) {
    next(err);
  }
});

// ---- generic error handler ----
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
