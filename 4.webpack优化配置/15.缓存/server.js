const  express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('build',{maxAge:1000*3600}))
app.listen(port, () => console.log(`Example app listening on port port!`))