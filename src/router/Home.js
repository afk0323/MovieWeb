import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from ".//css/Home.module.css";
import Slide from "../components/Slide";
import navList from "../atom/NavList";
import axios from "axios";
import Loading from "../components/Loading";


function Home(){
    
    /* API 받아오기 */
    const [ movieContents, setMovieContents ] = useState([]);
  
    useEffect(() => {

        /* map으로 navList의 목록을 api로 받아온다 */
        const request = navList.map(({title, path}) => {
            return axios.get('https://yts.mx/api/v2/list_movies.json?' + path, {
                params: {
                  limit: 10,
                  sort_by: 'download_count',
                  limit: 20,
                }
            })
        })

        axios.all(request)
        .then(axios.spread(async (...response) => {
            const data = await response.map(res => {
                if(res.status === 200){
                    return res.data.data.movies;
                }
            })

            console.log(data);
            setMovieContents(data);
        }))

    }, []) 

    
    /* 화면 그리기 */
    return (
        <div className={styles.container}>
          {navList.map((slide, idx) => {
            return (
                
              <div className={styles.slide__box}>
                  <h3 className={styles.title}>
                    <Link to={`/page/${slide.path}/1`}>
                      <i class="fas fa-external-link-alt"></i>
                      <span>{slide.title} Movie</span>
                    </Link>
                  </h3>
                  { movieContents && movieContents.length === 0 ? (
                      <Loading />
                    ) : (
                      <Slide movieContents={movieContents[idx]} />
                    )
                  }
              </div>
            )
          })}
          
        </div>
    );
}

export default Home;
