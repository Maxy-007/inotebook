const express = require('express')
const app = express()
const port = 3000
const connectToMongo = require('./db');

connectToMongo();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/note'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})