//First it will look for the module as a core module, then as a folder and finally inside node_modules

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000

app.use(cors())

let rappers = {
    
    
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (request, response) => {
    const rapperName = request.params.name.toLowerCase()
    //request.query is for optionals
    if(rappers[rapperName]){
        response.json(rappers[rapperName])
    }else{
        response.json(rappers['unknown'])
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})