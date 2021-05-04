const express = require('express')
const cors = require('cors')
const app = express()

//ajustes y archivos estaticos
app.set('port',process.env.PORT || 3000)

//middlewares
app.use(cors())
app.use(express.json())

//rutas
app.use(require('./routes/download'))

app.listen(app.get('port'),()=>{
    console.log(`Server running on port ${app.get('port')}`);
})

