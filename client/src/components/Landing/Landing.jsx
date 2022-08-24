import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Carruselito from './Carousel/Carousel';
import { getLibros } from '../../redux/features/data/dataSlice';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSlider from './Loading/LoadingSlider'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './landing.css'
import fotoBook from './assets/1.jpg'

function Landing() {



    let dispatch = useDispatch();
    let books = useSelector((state) => state.data.books);
    let loading = useSelector((state) => state.data.loading);
  
  
  useEffect(() => {   
    dispatch(getLibros());
  }, [dispatch]);
  
  let booksReduce2 = books.slice(15,30)
  let booksWithReviews = books.filter(b => b.reviews.length > 0)


  let sortByRating = booksWithReviews.sort((prev, next) => { 
    let previo = prev.reviews.reduce((acc, item)=>{ return  acc += item.rating}, 0) 
    let siguiente = next.reviews.reduce((acc, item)=>{ return  acc += item.rating}, 0)    
      return siguiente - previo
  })





  return (
    <>

<Swiper
    id='main'
    modules={[Navigation, Pagination, Autoplay , A11y ]}
    loop={true}
    a11y 
    pagination={{ clickable: true }}
    // navigation = {true}
    navigation={true}
    autoplay={{
        delay: 8000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
  >
    <SwiperSlide>
        <Link to={'/book/9780137843749'}>
            <img src="https://http2.mlstatic.com/D_NQ_816955-MLA51094796207_082022-OO.webp" alt="" />
        </Link>
    </SwiperSlide>

    <SwiperSlide>
        <Link to={'/book/9780596007010'}>
            <img src="https://http2.mlstatic.com/D_NQ_769107-MLA51061908411_082022-OO.webp" alt="" /> 
        </Link>
    </SwiperSlide>

    <SwiperSlide>
        <Link to={'/book/9780596517748'}>
            <img src="https://http2.mlstatic.com/D_NQ_735317-MLA51109137497_082022-OO.webp" alt="" />   
        </Link>
    </SwiperSlide>

    <SwiperSlide>
        <Link to={'/book/9780596527747'}>
            <img src={fotoBook} alt="" />   
        </Link>
    </SwiperSlide>

  </Swiper>

  {
    loading ? <LoadingSlider/> :
    <Carruselito books={booksReduce2}  title={'Best Sellers!'} />
  }
   

   {loading ? <LoadingSlider/> :
    <Carruselito books={sortByRating}  title={'Top Rated Books!'}   />
    }



  <Carruselito books={booksReduce}  title={"Best Selling Books"} />

  <Carruselito books={booksReduce2}  title={'Top Rated Books'}   />

    </>
   
  )
}

export default Landing