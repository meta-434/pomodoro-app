const express = require('express')
const app = express()
const axios = require('axios')
const port = process.env.PORT || 9000;

app.get('/login/quotes', (req, res) => {
    axios.get('https://api.adviceslip.com/advice')
        .then(response => res.send(response.data))
})

app.listen(port, () => console.log(`Server is now running`))