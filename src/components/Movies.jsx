
import React, {Fragment} from 'react'
import NoImg from './NoImg.png'
import '../Styles/Videos.css'
import Player from "./Player";

function Movies({data}) {
    // const {toggle} = useContext(Container)
   
    const Images = "https://image.tmdb.org/t/p/w500";

  return (
    <Fragment>
        <div className='secondaryBgColor'>
        <div className='movies-container'>
        {data.map((movie) => {
            return(
            <Fragment>
                <Player media_type="movie" id={movie.id} movie_data={movie}>
                    <div id={movie.id} className='card-movies container'>
                        <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg } alt=''/>
                        <h3>{movie.title}</h3>
                    </div>
                </Player>
            </Fragment>
            )
        })}
        </div></div>
    </Fragment>
  )
}

export default Movies