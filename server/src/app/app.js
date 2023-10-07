const express = require('express')
const morgan = require('morgan')

const usersRouter = require('../endpoints/users.router')
const areasRouter = require('../endpoints/areas.router')
const inversionsRouter = require('../endpoints/inversions.router')
const likesRouter = require('../endpoints/likes.router')
const projectsRouter = require('../endpoints/projects.router')
const rolsRouter = require('../endpoints/rols.router')

const app = express()

// Con esto, se leen todas las peticiones HTTP que se mandan a estas rutas
app.use(morgan("dev"))

app.get('/', (req, res) => {
    res.send('Inicializados')
})

// Peticiones router
app.use(express.json())
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/areas', areasRouter)
app.use('/api/v1/inversions', inversionsRouter)
app.use('/api/v1/likes', likesRouter)
app.use('/api/v1/projects', projectsRouter)
app.use('/api/v1/rols', rolsRouter)

module.exports = app;