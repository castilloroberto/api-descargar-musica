const express = require('express')
const cors = require('cors')
const favicon = require('serve-favicon')
const path = require('path')
const morgan = require('morgan')
const app = express()

//ajustes y archivos estaticos
app.set('port',3000)
app.use(express.static(path.join(__dirname,'public')))
app.use(favicon(path.join(__dirname,'public','favicon.ico')))

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//rutas
app.use(require('./routes/download'))

app.listen(app.get('port'),()=>{
    console.log(`Server running on port ${app.get('port')}`);
})

