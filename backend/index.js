// // require('dotenv').config();
// // const express        = require('express');
// // const cookieParser   = require('cookie-parser');
// // const morgan         = require('morgan');
// // const cors           = require('cors');

// // const usersRouter    = require('./Routes/users');
// // const authRouter     = require('./Routes/auth');
// // const db             = require('./Services/db');
// // const logger         = require('./Services/logger');
// // const { requireAuth } = require('./middleware/jwt');  
// // const communityRouter = require('./Routes/communityRoutes'); 

// // /* —————————————————— app & global middleware —————————————————— */
// // const app = express();

// // app.use(cors({
// //   origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
// //   credentials: true                              // send/receive cookies
// // }));

// // app.use(express.json());
// // app.use(cookieParser());

// // app.use(morgan('tiny', {
// //   stream: { write: msg => logger.http(msg.trim()) }
// // }));

// // /* —————————————————— public routes —————————————————— */
// // app.use('/api/v1/users', usersRouter);   // e.g. registration
// // app.use('/api/v1/auth',  authRouter);    // login / refresh / logout
// // app.use('/api/v1/community', communityRouter); // e.g. community routes

// // /* —————————————————— protected example —————————————————— */
// // app.get('/api/v1/hello', requireAuth, async (req, res, next) => {
// //   try {
// //     const { rows: [u] } = await db.query(
// //       'SELECT name FROM users WHERE id = $1',
// //       [req.user.id]     // set by requireAuth
// //     );
// //     res.json({ message: `Hello, ${u ? u.name : 'friend'}!` });
// //   } catch (err) {
// //     next(err);
// //   }
// // });

// // /* —————————————————— generic error handler —————————————————— */
// // app.use((err, _req, res, _next) => {
// //   logger.error(err);           // prettier logging than console.error
// //   res.status(500).json({ error: 'Server error' });
// // });

// // /* —————————————————— start server —————————————————— */
// // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //   logger.info(`Server running on port ${PORT}`);
// // // });
// // app.listen(PORT, '0.0.0.0', () => {
// //   console.log('Server listening on port 5000');
// // })


// // index.js
// 'use strict';

// require('dotenv').config();
// const path          = require('path');
// const express       = require('express');
// const cookieParser  = require('cookie-parser');
// const morgan        = require('morgan');
// const cors          = require('cors');
// const helmet        = require('helmet');

// const usersRouter     = require('./Routes/users');
// const authRouter      = require('./Routes/auth');
// const communityRouter = require('./Routes/communityRoutes'); // keep your path/name
// const db              = require('./Services/db');
// const logger          = require('./Services/logger');
// const { requireAuth } = require('./middleware/jwt');

// /* ───────────────────────── app & security ───────────────────────── */
// const app = express();

// // Security headers (allow cross-origin images for your uploaded assets)
// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: 'cross-origin' },
//   })
// );
// app.disable('x-powered-by');

// // CORS: allow all by default, or restrict via CORS_ORIGIN (comma-separated)
// const rawOrigins = (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
// const allowAll   = rawOrigins.length === 0 || rawOrigins.includes('*');

// app.use(
//   cors({
//     origin: allowAll
//       ? true // reflect request origin
//       : function (origin, cb) {
//           if (!origin) return cb(null, true); // non-browser tools
//           return cb(null, rawOrigins.includes(origin));
//         },
//     credentials: !allowAll, // only set credentials when you specify exact origins
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );
// // Handle preflight quickly
// app.options('*', cors());

// /* ───────────────────────── parsers & logs ───────────────────────── */
// app.use(express.json({ limit: '5mb' }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(
//   morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'tiny', {
//     stream: { write: msg => logger.http(msg.trim()) },
//   })
// );

// /* ───────────────────────── static uploads ─────────────────────────
//    Serve files that controllers save into /uploads/community-images
//    Example URL: GET /uploads/community-images/<file>
// ------------------------------------------------------------------- */
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
//   maxAge: '7d',
//   etag: true,
// }));

// /* ───────────────────────── health check ───────────────────────── */
// app.get('/api/v1/health', (_req, res) => res.json({ ok: true }));

// /* ───────────────────────── public routes ───────────────────────── */
// app.use('/api/v1/users',     usersRouter);   // registration
// app.use('/api/v1/auth',      authRouter);    // login / refresh / logout
// app.use('/api/v1/community', communityRouter);

// /* ───────────────────────── protected sample ────────────────────── */
// app.get('/api/v1/hello', requireAuth, async (req, res, next) => {
//   try {
//     const { rows: [u] } = await db.query(
//       'SELECT name FROM users WHERE id = $1',
//       [req.user.id] // set by requireAuth
//     );
//     res.json({ message: `Hello, ${u ? u.name : 'friend'}!` });
//   } catch (err) {
//     next(err);
//   }
// });

// /* ───────────────────────── 404 handler ─────────────────────────── */
// app.use((req, res, _next) => {
//   if (req.path.startsWith('/api/')) {
//     return res.status(404).json({ error: 'Not found' });
//   }
//   return res.status(404).send('Not found');
// });

// /* ───────────────────────── error handler ───────────────────────── */
// app.use((err, _req, res, _next) => {
//   logger.error(err);
//   const code = err.status || 500;
//   res.status(code).json({
//     error: process.env.NODE_ENV === 'production' ? 'Server error' : err.message,
//   });
// });

// /* ───────────────────────── start server ────────────────────────── */
// const PORT = process.env.PORT || 5000;
// const HOST = process.env.HOST || '0.0.0.0';

// const server = app.listen(PORT, HOST, () => {
//   logger.info(`Server running on http://${HOST}:${PORT}`);
// });

// /* ───────────────────────── graceful shutdown ───────────────────── */
// function shutdown(signal) {
//   logger.warn(`${signal} received. Shutting down...`);
//   server.close(() => {
//     logger.info('HTTP server closed');
//     process.exit(0);
//   });
//   // Force-exit after 10s if something hangs
//   setTimeout(() => process.exit(1), 10000).unref();
// }

// process.on('SIGINT',  () => shutdown('SIGINT'));
// process.on('SIGTERM', () => shutdown('SIGTERM'));

// module.exports = app;


'use strict';

require('dotenv').config();
const path          = require('path');
const express       = require('express');
const cookieParser  = require('cookie-parser');
const morgan        = require('morgan');
const cors          = require('cors');
const helmet        = require('helmet');

const usersRouter     = require('./Routes/users');              // keep your original
const authRouter      = require('./Routes/auth');               // keep your original
const communityRouter = require('./Routes/communityRoutes');    // this file
const db              = require('./Services/db');
const logger          = require('./Services/logger');
const { requireAuth } = require('./middleware/jwt');

const app = express();

/* ---------- Security ---------- */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.disable('x-powered-by');

/* ---------- CORS ---------- */
// Allow all origins by default (or specify comma-separated list in CORS_ORIGIN)
const allowed = (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
const allowAll = allowed.length === 0 || allowed.includes('*');

app.use(cors({
  origin: allowAll
    ? true
    : function (origin, cb) {
        if (!origin) return cb(null, true); // Postman/curl
        cb(null, allowed.includes(origin));
      },
  credentials: true,
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

/* ---------- Parsers & Logs ---------- */
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'tiny', {
    stream: { write: msg => logger.http(msg.trim()) },
  })
);

/* ---------- Static uploads ---------- */
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '7d',
  etag: true,
}));

/* ---------- Health ---------- */
app.get('/api/v1/health', (_req, res) => res.json({ ok: true }));

/* ---------- Public routes ---------- */
app.use('/api/v1/users',     usersRouter);
app.use('/api/v1/auth',      authRouter);
app.use('/api/v1/community', communityRouter);

/* ---------- Protected example ---------- */
app.get('/api/v1/hello', requireAuth, async (req, res, next) => {
  try {
    const { rows: [u] } = await db.query(
      'SELECT name FROM users WHERE id = $1',
      [req.user.id]
    );
    res.json({ message: `Hello, ${u ? u.name : 'friend'}!` });
  } catch (err) {
    next(err);
  }
});

/* ---------- 404 (API only) ---------- */
app.use((req, res, _next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  return res.status(404).send('Not found');
});

/* ---------- Error handler ---------- */
app.use((err, _req, res, _next) => {
  logger.error(err);
  const code = err.status || 500;
  res.status(code).json({
    error: process.env.NODE_ENV === 'production' ? 'Server error' : err.message,
  });
});

/* ---------- Start server ---------- */
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  logger.info(`Server running on http://${HOST}:${PORT}`);
});

/* ---------- Graceful shutdown ---------- */
function shutdown(signal) {
  logger.warn(`${signal} received. Shutting down...`);
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGINT',  () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

module.exports = app;

