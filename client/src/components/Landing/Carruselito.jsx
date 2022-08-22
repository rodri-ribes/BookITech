import React from 'react'
import { Link } from 'react-router-dom';
import { Navigation} from 'swiper';
import './carruselito.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Carruselito({books, title}) {



  return (
    <div className="carruselito">
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
      <div className="slide-container">
      <Link to={`/book/${l.isbn13}`} className="link-slide">
      <div className="slide-image">
        <img src={l.image} alt="" />
      </div>
      </Link>
      </div>
     
    
  </SwiperSlide>
      )

    })
    : null
  }



    </Swiper>
    </div>


  )
}
