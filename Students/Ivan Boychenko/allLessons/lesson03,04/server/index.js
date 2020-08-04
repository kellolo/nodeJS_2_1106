const express = require('express')
const fs = require('fs')

const server = express()
server.use(express.json())

server.use('/', express.static('./public'))

server.post('/', (req,res) => {
    let userNum = req.body.text
    let cows = req.body.cows
    let bulls = req.body.bulls
    let status = req.body.status
    let info = `
            ****\n
            user: ${userNum}
            cows: ${cows}
            bulls: ${bulls}
            status: ${status}


    `

    fs.appendFile('test.txt', info, (err) => {
        console.log('data added')
    })
})


server.listen(8070, () => {
    console.log('http://localhost:8070');
})