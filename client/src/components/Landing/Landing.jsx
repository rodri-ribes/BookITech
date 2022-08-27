import React, { useEffect, useState } from 'react'
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
import img1 from './assets/imagen1.png'
import img2 from './assets/imagen2.png'
import img3 from './assets/imagen4.png'
import img4 from './assets/imagen5.png'
import axios from 'axios';
const { REACT_APP_API } = process.env


function Landing() {
  
  let dispatch = useDispatch();
  let books = useSelector((state) => state.data.books);
  let loading = useSelector((state) => state.data.loading);

  //----------------- LOGICA DE LOS MAS VENDIDOS ------------------------
  
    const [ventas, setVentas] = useState(false)

    async function main() {
      let admin = "admin"
      try {
          let data = await axios.get(REACT_APP_API + `/user/admin/${admin}`);
          setVentas(data.data)
      } catch (error) {
          console.log(error)
      }
  }
  
  useEffect(() => {
      main()
  }, [])

  const [best, setBest] = useState(false)

  let filtrado = []
  let filtrado2 = []

  if(ventas){
    ventas.filter(c => {
      if(c.buy.length > 0){
          c.buy.forEach(f => {
            filtrado.push(f.isbn13)
          })
      }
    })
    filtrado2 = [...new Set(filtrado)] 
  }
  
  useEffect(() => { 
    setBest(books.filter(c => {
      return filtrado2.includes(c.isbn13)
    }))
}, [books])

//-------------------------------------------------------------

  
  useEffect(() => {   
    dispatch(getLibros());
  }, [dispatch]);
  
  let booksWithReviews = books.filter(b => b.reviews.length > 0)


  let sortByRating = booksWithReviews.sort((prev, next) => { 
    let previo = (prev.reviews.reduce((acc, item)=>{ return  acc += item.rating}, 0))/ prev.reviews.length 
    let siguiente = (next.reviews.reduce((acc, item)=>{ return  acc += item.rating}, 0) )/ next.reviews.length  
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
        <img src={img1} alt="" />
    </Link>
  </SwiperSlide>

  <SwiperSlide>
    <Link to={'/book/9781484243299'}>
        <img src={img2} alt="" /> 
    </Link>
  </SwiperSlide>

  <SwiperSlide>
    <Link to={'/book/9780321884916'}>
        <img src={img3} alt="" />   
    </Link>
  </SwiperSlide>

  <SwiperSlide>
    <Link to={'/book/9781484273913'}>
        <img src={img4} alt="" />   
    </Link>
  </SwiperSlide>

</Swiper>

  {
    loading ? <LoadingSlider/> :
    <Carruselito books={best}  title={'Best Sellers!'} />
  }
   

   {loading ? <LoadingSlider/> :
    <Carruselito books={sortByRating}  title={'Top Rated Books!'}   />
    }


    </>
   
  )
}

export default Landing