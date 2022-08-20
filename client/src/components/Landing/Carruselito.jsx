import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation, Pagination, Autoplay, A11y, History, HashNavigation   } from 'swiper';
import { getLibros } from '../../redux/features/data/dataSlice';
import './carruselito.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Carruselito() {

  let dispatch = useDispatch();
  let books = useSelector((state) => state.data.books);


useEffect(() => {   
  dispatch(getLibros());
}, [dispatch]);

let booksReduce = books.slice(0,15)
console.log(booksReduce)

  return (
    <div className="carruselito">
  <Swiper
      // id='main'
      modules={[Navigation]}
      navigation= {true}
      slidesPerView={5}
      slidesPerGroupAuto={true}
    >
  {
    booksReduce.map(l =>{
      return(
    <SwiperSlide>
      <div className="slide-container">
      <Link to={'/'} className="link-slide">
      <div className="slide-image">
        <img src={l.image} alt="" />
      </div>
      <div className="slide-text">
        <div className="slide-name">

         <p>{l.title}</p>

        </div>
        <div className="slide-price">

          <p>{l.price}</p>

        </div>
      </div>
      </Link>
      </div>
     
    
  </SwiperSlide>
      )

    })
  }



    </Swiper>
    </div>


  )
}
