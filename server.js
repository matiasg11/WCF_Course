//First it will look for the module as a core module, then as a folder and finally inside node_modules

const express = require('express')
const app = express()
const cors = require('cors')
const Joi = require('joi')
const { response } = require('express')
const port = process.env.PORT || 8000
app.use(express.json())
app.use(cors())

let movieGenres = [
    {id:1, name:"Terror"},
    {id:2, name:"Suspense"},
    {id:3, name:"Comedy"},
    {id:4, name:"Thriller"},
    {id:5, name:"Comedy"},
]

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/movieGenres', (request, response) => {
    response.send(movieGenres)
})


app.post('/api/movieGenres', (request, response)=>{
    const {error} = validateGenre(request.body);
    if (error) return response.status(400).send(error.details[0].message)


    let movieGenre = {
        id: movieGenres.length+1,
        name: request.body.name
    }

    movieGenres.push(movieGenre)
    response.send(movieGenre)
})

app.put('/api/movieGenres/:id', (request, response)=> {
    const movieGenre = movieGenres.find(item => item.id === parseInt(request.params.id))
    if (!movieGenre) return response.status(404).send("The genre with the corresponding ID was not found. Sorry!")

    const {error} = validateGenre(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    movieGenre.name = request.body.name
    response.send(movieGenre)
})

app.delete('/api/movieGenres/:id', (request, response)=> {
    const movieGenre = movieGenres.find(item => item.id === parseInt(request.params.id))
    if (!movieGenre) return response.status(400).send("The genre with the corresponding ID was not found. Sorry!")

    const index = movieGenres.indexOf(movieGenre)
    movieGenres.splice(index, 1)
    response.send(movieGenre)
})

app.get('/api/movieGenres/:id', (request, response) => {
    const movieGenre = movieGenres.find(item => item.id === parseInt(request.params.id))

    if (!movieGenre){
        return response.status(404).send("The genre with the corresponding ID was not found. Sorry!")
    }
    
    response.send(movieGenre)
})

function validateGenre(genre){
    const schema = Joi.object({ name: Joi.string().min(3).required()});
    
    let answer =  schema.validate(genre)
    console.log(answer)
    return answer

    
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})