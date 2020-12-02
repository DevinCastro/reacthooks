import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [movieState, setMovieState] = useState({
    movies: [],
    movie: ''
  })

  movieState.handleInputChange = event => {
    setMovieState({ ...movieState, [event.target.name]: event.target.value })

  }

  movieState.handleButtonClick = event => {
    event.preventDefault()

    axios.get(`http://www.omdbapi.com/?t=${movieState.movie}&apikey=58359cc2`)
      .then(({ data }) => {
        console.log(movieState.movies)
        console.log(data)


       
        setMovieState({ ...movieState, movies: [...movieState.movies, data], movie: '' })
        
      })
      .catch(err => console.log(err))
  }




  return (
    <>
      <form>
        <label htmlFor="movie">Search for a movie</label>
        <input
          type="text"
          name="movie"
          value={movieState.movie}
          onChange={movieState.handleInputChange}
        />
        <button onClick={movieState.handleButtonClick}>Submit</button>
      </form>

      <button onClick={() => console.log(movieState)}>Submit</button>




      <div>

        


        {
            movieState.movies.length > 0 ? (
              movieState.movies.map(movie => (
              <ul id="movieList">
                <li>
                  <h1>{movie.Title}</h1>
                  <p>{movie.Plot}</p>
                </li>
              </ul>
              ))
            ) : null
          } 


      </div>


    </>
  )
}

export default App