import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getBookDetail ,setComent} from '../../redux/features/data/dataSlice'
import det from "./Detail.module.css"
import {RiShoppingCart2Fill} from "react-icons/ri"
import {FaStar} from "react-icons/fa"
import ReviewCards from './ReviewCards'


const img= "https://www.collinsdictionary.com/images/full/book_181404689_1000.jpg"
function Detail() {
  //nombre, autor, editorial, genero, idioma, formato, precio, stock, img
  const dispatch=useDispatch()
  const {details}=useSelector((state=>state.data))
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
//
  return (
    <>
    {}
  <div className={det.ContainerMaxDet}>
      <div className={det.Container_Det2}>
        <img src={details.image} alt="not found" className={det.ImgRedonda1}/>
        <button className={det.Container_Information_btn}>Buy me!! <RiShoppingCart2Fill/></button>
      </div>
    <div className={det.Container_Det1}>
      <h1 className={det.Title}>{details.title}</h1> 
      <h3 className={det.subTitle}>{details.subtitle}</h3>
      <h2 className={det.authors}>{details.authors}</h2>
     <ul className={det.List}>
      <li>Genre</li>
      <li>{details.language}</li>
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
          <h1 className={det.Summary}>Tecnic description</h1>
          <h3>{details.title}</h3>
          <p>Authors: {details.authors}</p>
          <p>Publisher: {details.publisher}</p>
          <p>language: {details.language}</p>
          <p>Year of published: {details.year}</p>
          <p>Total pages: {details.pages}</p>
          <p>Average Rating: {currentValue.length>0&&prom()} ⭐</p>
        </div>
      </div>
      {/* <Review currentValue={currentValue} currentUser="1"/>  */}
      <ReviewCards currentUserId="1"/>
    </>
  )
}

export default Detail
