const express = require('express');
const cors = require('cors')

const app = express()

app.use(cors());
app.use(express.json())

app.listen(process.env.PORT || 3001, function(){
    console.log(`SERVER IS RUNNIN ON PORT: ${this.adress().port}`)
})