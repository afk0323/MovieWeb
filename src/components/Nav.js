import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { listPageReLoading, focusNav } from "../atom/Atoms";
import navList from "../atom/NavList";
import styles from ".//css/Nav.module.css";

function Nav() {
    let last_known_scroll_position = 0;
    let ticking = false;
    const [changing, setChanging] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    const pageReLoading = useSetRecoilState(listPageReLoading);
    const [focusPath, setFocusPath] = useRecoilState(focusNav);

    /* 스크롤 했을 때 설정 */
    const doSomething = (scroll_pos) => {
        if (scroll_pos >= 10) {
            setChanging(true);
            setScrolling(true);
        } else {
            setChanging(false);
            setScrolling(false);
        }
    }

    /* 스크롤 감지 */
    window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                doSomething(last_known_scroll_position);
                ticking = false;
            });
            ticking = true;
        }
    });

    /* 네비게이션바 마우스 */
    const onMouseOverOut = () => {
        if (scrolling)
            return;      
        setChanging(current => !current);
    }    

    /* 네비게이션바 클릭 리로드 */
    const optionOnClick = () => {
        pageReLoading(true);
    }
    
    return (
        <div>
            
            <nav className={styles.container} onMouseOver={onMouseOverOut} onMouseOut={onMouseOverOut} 
                style={changing ? {backgroundColor : "black", boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"}
                : {backgroundColor : "transparent"}}>

                <div className={styles.title}>
                    <Link to="/MovieLike" onClick={() => setFocusPath("")}>
                        <strong style={{color : "#E50914"}}>NETFLEX</strong>
                    </Link>
                </div>
             
                <ul className={styles.icon__list}>
                    <li><a href="https://github.com/" target="_blank"><i class="fab fa-github"></i></a></li>
                    <li><a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a></li>
                </ul>

            </nav>

            <div className={styles.null}></div>
        </div>
    )
}

export default Nav;
