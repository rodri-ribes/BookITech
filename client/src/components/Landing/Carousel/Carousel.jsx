import React from 'react'
import { Link } from 'react-router-dom';
import { Navigation} from 'swiper';
import style from './carousel.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Carruselito({books, title}) {



  return (
    <div className={style.carruselito}>
      <h2>{title}</h2>
  <Swiper
      // id='main'
      modules={[Navigation]}
      navigation= {true}
      slidesPerView={5}
      slidesPerGroupAuto={true}
    >
  {
    books ? books.map(l =>{
    return(
      <SwiperSlide>
        <div className={style.slide_container}>
          <Link to={`/book/${l.isbn13}`} className={style.slide_link}>
            <div className={style.slide_img}>
              <img src={l.image} alt={l.title} />
            </div>
            <div className={style.slide_info}>
              <h3>{l.title.charAt(0).toUpperCase() + l.title.slice(1)}</h3>
              {/* <p>{l.authors}</p> */}
            </div>
          </Link>
        </div>
      </SwiperSlide>
    )})
    : null
  }



    </Swiper>
    </div>


  )
}
