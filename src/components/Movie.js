import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styles from ".//css/Movie.module.css";

function Movie({ id, coverImg, title, year, summary, genres, movie_style }){

    // 포스터가 없으면 안되는 조건
    if(coverImg == ""){
        return null;
    }

    return (
        <div className={styles.movie} style={movie_style}>
            <Link to={`/movie/${id}`}><img src={coverImg} alt={title} className={styles.movie__img} /></Link>
            
            <div>
                <h2 className={styles.movie__title}>
                    <Link to={`/movie/${id}`}>{title && title.length > 50 ? `${title.slice(0, 50)}...` : title}</Link>
                </h2>
                <h3 className={styles.movie__year}>{year}</h3>
                <p className={styles.movie__summary}>{summary && summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
                <ul className={styles.movie__genres}>
                    {genres.map((genre) => (
                        <li key={genre}>{genre}</li>
                    ))}
                </ul>
            </div>
    
        </div>
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
