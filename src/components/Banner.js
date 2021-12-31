import React,{useState, useEffect} from 'react'
import tmdbApi from '../api/tmdbApi'
import {truncate} from '../untils/untils'
import Modal from './Modal'
import genres from "../assets/data/genres";
import genrestv from "../assets/data/genrestv";

const baseImgUrl = `https://image.tmdb.org/t/p/original/`;

function Banner(props) {
    const category = props.category
    const [movie, setMovie] = useState([])
    //   genres
    var gender_ids = [];
    if(category === 'movie'){
        genres.map(el => (gender_ids[el.id] = el.name));
    } else
    genrestv.map(el => (gender_ids[el.id] = el.name));

    const matchTitle = movie?.original_title || movie?.title || movie?.name || movie?.original_name

    //   Modal
        const [selected, setSelected] = useState([])
        const [isShowing, setisShowing] = useState(false)

        const handleOpen = (movie) => {
            setSelected(movie)
            setisShowing(true)

            
        }

        const handleClose = () => {
            setisShowing(false)
            setSelected([])
        }
    useEffect(() => {

         

        const fetchData = async () => {
           const params = {}
           let res = null
            if(category === 'movie'){
                res = await tmdbApi.getMoviesList(props.type,{params})
            }
            else
            res = await tmdbApi.getTvList(props.type,{params})
            

           
           setMovie(res.results[Math.floor(Math.random() * res.results.length - 1)])
           return res;
       }
       fetchData()

    }, [category,props.type])
    useEffect(() => {
        document.body.classList.toggle('no-scroll',isShowing)
    }, [isShowing])
    
    console.log(movie)
    return (
        <div className="section-banner" style={{backgroundImage:`url(${baseImgUrl}${movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path})`}}>
            <div className="banner-content">
                {/* original_title, title : movie ;original_name, name: tvseries  */}
                <h3 className="title">{matchTitle}</h3>
                <div className="desc">{truncate(movie?.overview,150)}</div>
                <div className="btn-group">
                    <span className="btn btn-play"> <i className="fa fa-play"></i> Play</span>
                    <span className="btn btn-info"  onClick={()=>handleOpen(movie)}> <i className="fa fa-info"></i> More Info</span>
                </div>
            </div>
            <Modal
                            isShowing={isShowing}
                            close={handleClose}
                            movie={selected}
                            category={category}
                            gender_ids={gender_ids}
                            title={matchTitle}
                            />
        </div>
        
    )
}

export default Banner
