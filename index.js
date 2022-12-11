const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const app = express()

app.use(cors());
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 3001, function(){
    console.log(`SERVER IS RUNNIN ON PORT: ${this.adress().port}`)
})