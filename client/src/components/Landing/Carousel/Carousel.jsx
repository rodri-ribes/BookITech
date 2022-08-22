import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navigation} from 'swiper';
import './carousel.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { getFav,GetHeart } from '../../../redux/features/data/dataSlice'


export default function Carruselito({books, title}) {

  const dispatch = useDispatch();
  const idUser= ()=>{
    if( window.localStorage.getItem("user")){
        let auxUser = JSON.parse(window.localStorage.getItem("user"))
        let idUser = auxUser?.email
        dispatch(GetHeart(idUser))
        dispatch(getFav(idUser))
    }
}

useEffect(() => {  
  if(window.localStorage.getItem("user")) idUser()   
}, [dispatch]);

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
    )})
    : null
  }



    </Swiper>
    </div>


  )
}
