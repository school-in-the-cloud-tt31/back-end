const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();

const authRouter = require('../auth/authRouter')
const volunteersRouter = require('../volunteers/volunteersRouter')
const tasksRouter = require('../tasks/tasksRouter')
const calendarRouter = require('../calendar/calendarRouter')
const protectedRoute = require('../utils/protected')

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter)
server.use('/api/volunteers', protectedRoute, volunteersRouter)
server.use('/api/tasks', protectedRoute, tasksRouter)
server.use('/api/availability',protectedRoute, calendarRouter)


server.get('/',  (req, res) => {
  res.status(200).json({api: 'up'})
})

module.exports = server