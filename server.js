//First it will look for the module as a core module, then as a folder and finally inside node_modules

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000
app.use(express.json())
app.use(cors())

let movies = [
    {id:1, name:"movie1", genre:"Terror"},
    {id:2, name:"movie2", genre:"Suspense"},
    {id:3, name:"movie3", genre:"Comedy"},
    {id:4, name:"movie4", genre:"Thriller"},
    {id:5, name:"movie5", genre:"Terror"},
    {id:6, name:"movie6", genre:"Comedy"},
]

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/movies', (request, response) => {
    response.send(movies)
})

app.get('/api/movies/:genre', (request, response) => {
    const movieGenre = movies.find(elem => elem.genre.toLowerCase() === request.params.genre.toLowerCase())
    if (!movieGenre){
        return response.status(404).send("The genre does not exist.")
    }

    response.send(movieGenre)
})

app.post('/api/movies', (request, response)=>{
    let movie = {
        id: `${movies.length+1}`,
        name:`movie${movies.length+1}`,
        genre: request.body.genre
    }
    movies.push(movie)
    response.send(movie)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})