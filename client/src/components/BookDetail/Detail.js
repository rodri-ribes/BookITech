import React,{useEffect,useState} from 'react'
import {useParams,Link} from "react-router-dom"
import { GoSignIn } from 'react-icons/go'
import {useDispatch, useSelector} from "react-redux"
import { getBookDetail ,AddCart,deleteCart} from '../../redux/features/data/dataSlice'
import det from "./Detail.module.css"
import {RiShoppingCart2Fill} from "react-icons/ri"
import {FaStar} from "react-icons/fa"
import ReviewCards from './ReviewCards'



const img= "https://www.collinsdictionary.com/images/full/book_181404689_1000.jpg"
function Detail() {
  //nombre, autor, editorial, genero, idioma, formato, precio, stock, img
  const dispatch=useDispatch()
  const {details}=useSelector((state=>state.data))
  const [cart,setCart]= useState(false)
  const {id}= useParams()
  useEffect(()=>{
    dispatch(getBookDetail(id))
  },[dispatch,id])
//starts//

const colors={
  Blue: "#013B95",
  grey:"#a9a9a9"
}
const starts = Array(5).fill(0)
const[currentValue,setCurrent]= useState([])
const[hover,setHover]= useState(undefined)

function changeClick(value){
  setCurrent([value,...currentValue])
  //dispatch(setComent(currentValue))
}
function hoverStar(value){
  setHover(value)  
}
function removeHover(){
  setHover(undefined)
}
function prom(){
  let sum= currentValue.reduce((prev,curr)=>curr+=prev)
  let avg=sum/currentValue.length
  let ceil=Math.ceil(avg)
  return ceil
}
const addToCart = () => {
  //Aca iria el dispatch de la actions que agregaria el item al carrito
  setCart(true)
  dispatch(AddCart(id))
}
const RemoveToCart = () => {
  //Aca iria el dispatch de la actions que quitaria el item al carrito
  setCart(false)
  dispatch(deleteCart(id))
}

//
  return (
    <>
    {}
  <div className={det.ContainerMaxDet}>
      <div className={det.Container_Det2}>
        <img src={details.image} alt="not found" className={det.ImgRedonda1}/>
        {cart ?
                    <button className={`${det.Container__Information_btn} ${det.Container__Information_btnTrue}`} onClick={() => RemoveToCart()}>Remove From Cart <RiShoppingCart2Fill/> </button>
                    :
                    <button className={`${det.Container__Information_btn} ${det.Container__Information_btnFalse}`} onClick={() => addToCart()}>Add To Cart <RiShoppingCart2Fill/> </button>
                }
        {/* <button className={det.Container_Information_btn}>Buy me!! <RiShoppingCart2Fill/></button> */}
      </div>
    <div className={det.Container_Det1}>
      <h1 className={det.Title}>{details.title}</h1> 
      <h3 className={det.subTitle}>{details.subtitle}</h3>
      <h2 className={det.authors}>{details.authors}</h2>
     <ul className={det.List}>
      <li className={det.ListEle}>Genre</li>
      <li className={det.ListEle}>{details.language}</li>
     </ul>
        <h2 className={det.Price}>{details.price}</h2>
        <div className={det.ButtonRow}>
            <h2>Rating</h2>
            <div className={det.StarButton}>
              {starts.map((_,index)=>{
                return(
                  <FaStar
                    key={index}
                    style={{marginRight:10}}
                    color={(hover||currentValue)>index?colors.Blue:colors.grey}
                    onClick={() => changeClick(index+1)}
                    onMouseOver={()=>hoverStar(index+1)}
                    onMouseLeave={removeHover}
                  />
                )
              })}
            </div>
        </div>
        
      </div>
      </div>
      <div className={det.ContainerSumm}>
        <div className={det.Container_Det6}>
          <h1 className={det.Summary}>Summary</h1>
          <p>
            {details.desc}
          </p>
        </div>
        <div className={det.Container_Det6}>
          <h1 className={det.Summary}>Technic description</h1>
          <h3>{details.title}</h3>
          <p>Authors: {details.authors}</p>
          <p>Publisher: {details.publisher}</p>
          <p>language: {details.language}</p>
          <p>Year of published: {details.year}</p>
          <p>Total pages: {details.pages}</p>
          <p>Average Rating: {currentValue.length>0&&prom()} ⭐</p>
        </div>
      </div>
      {window.localStorage.getItem("user")?<ReviewCards currentUserId="1"/> :
      <div className={det.GoSignIn}>
        <GoSignIn />
        <Link className={det.SignIn} to="/signin">let your review</Link>
      </div>}
    </>
  )
}

export default Detail
