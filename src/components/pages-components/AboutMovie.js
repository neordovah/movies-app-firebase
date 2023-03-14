import React, {useEffect, useState} from 'react'
import { redirect,  useParams } from 'react-router-dom'
import "../../styles/AboutMovie.scss"

function AboutMovie(props) {

    const {movieID} = useParams()
    const [movie, setMovie] = useState()
    const [loading, setLoading] = useState(true)
   
    let navigate = props.navigate


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=a49657255c827cf52a3f7b9ebbd6571e&language=en-US`).then(result => result.json()).then(data => {
            setMovie(data)
            setLoading(false)
        })
      }, [])

      const handleBackHome = (e) => {
        e.preventDefault()
        navigate("/")
      }


    return (
        <>
        {!loading ? 
        <div className="pageAbMovie">
            <img  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} width="300px"/>
            <h1>{movie && (movie?.title || movie?.name)}</h1>
            {/* <h3>{((movie?.title || movie?.original_name) !== movie?.original_name) && "Original name: " && movie?.original_name}</h3> */}
            <h4>Release date: {movie?.release_date}</h4>  
            
            <button className="backHome" onClick={(e) => handleBackHome(e)}>Go back</button>
        </div>
        : <h1>Loading...</h1>}
        </>
    )
    //     <div className="pageAbMovie">
    //         {!loading ? 
    //         <><div className='movie'>
    //             <div className='leftSide'>
    //                 <h1>{movie && (movie?.title || movie?.name)}</h1>
    //                 {/* <h3>{((movie?.title || movie?.original_name) !== movie?.original_name) && "Original name: " && movie?.original_name}</h3> */}
    //                 <h4>Release date: {movie?.release_date}</h4>
                    
    //             </div>
    //             <div className="rightSide">
    //             <img  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} width="400px"/>
    //             </div>
    //         </div>
    // <button className="backHome" onClick={(e) => handleBackHome(e)}>Go back</button></>
    //         : <h1>Loading...</h1>}
    //     </div>
    
}

export default AboutMovie