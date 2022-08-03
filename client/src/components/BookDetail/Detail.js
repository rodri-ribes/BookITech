import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getBookDetails ,setComent} from '../../redux/features/data/dataSlice'
import det from "./Detail.module.css"
import {RiShoppingCart2Fill} from "react-icons/ri"
import {FaStar} from "react-icons/fa"
import ReviewCards from './ReviewCards'


const img= "https://www.collinsdictionary.com/images/full/book_181404689_1000.jpg"
function Detail() {
  //nombre, autor, editorial, genero, idioma, formato, precio, stock, img
  const dispatch=useDispatch()
  //const {details}=useSelector((state=>state.data))
  const {id}= useParams()
  useEffect(()=>{
    dispatch(getBookDetails(id))
  },[dispatch,id])
//starts//

const colors={
  Blue: "#013B95",
  grey:"#a9a9a9"
}
const starts = Array(5).fill(0)
const[currentValue,setCurrent]= useState(0)
const[hover,setHover]= useState(undefined)

function changeClick(value){
  setCurrent(value)
  //dispatch(setComent(currentValue))
}
function hoverStar(value){
  setHover(value)  
}
function removeHover(){
  setHover(undefined)
}

//

  return (
    <>
    {}
  <div className={det.ContainerMaxDet}>
      <div className={det.Container_Det2}>
        <img src={img} alt="not found" className={det.ImgRedonda1}/>
        <button className={det.Container_Information_btn}>Buy me!! <RiShoppingCart2Fill/></button>
      </div>
    <div className={det.Container_Det1}>
      <h1 className={det.Title}>Tittle</h1> 
      <h2>Author</h2>
     <ul className={det.List}>
      <li>Genre</li>
      <li>Language</li>
      <li>Format</li>
      <li>Stock</li>
     </ul>
        <h2 className={det.Price}>Price</h2>
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
            Wilco es una banda de rock alternativo de Chicago, Illinois, Estados Unidos, formada en 1994 por los miembros restantes de la banda de country alternativo Uncle Tupelo poco después de la marcha del cantante Jay Farrar. La formación de Wilco ha sufrido diversos cambios desde su formación, con solo el vocalista/compositor Jeff Tweedy y el bajista John Stirratt como miembros fijos desde el inicio. Desde principios de 2004, el resto de la banda consta del guitarrista Nels Cline, los multiinstrumentistas Pat Sansone y Mikael Jorgensen y el batería Glenn Kotche. Han lanzado al mercado ocho discos de estudio, un álbum en directo y tres colaboraciones: dos con Billy Bragg y uno con The Minus 5.
          </p>
        </div>
        <div className={det.Container_Det6}>
          <h1 className={det.Summary}>Synapse</h1>
          <p>
            Wilco es una banda de rock alternativo de Chicago, Illinois, Estados Unidos, formada en 1994 por los miembros restantes de la banda de country alternativo Uncle Tupelo poco después de la marcha del cantante Jay Farrar. La formación de Wilco ha sufrido diversos cambios desde su formación, con solo el vocalista/compositor Jeff Tweedy y el bajista John Stirratt como miembros fijos desde el inicio. Desde principios de 2004, el resto de la banda consta del guitarrista Nels Cline, los multiinstrumentistas Pat Sansone y Mikael Jorgensen y el batería Glenn Kotche. Han lanzado al mercado ocho discos de estudio, un álbum en directo y tres colaboraciones: dos con Billy Bragg y uno con The Minus 5.
          </p>
        </div>
      </div>
      {/* <Review currentValue={currentValue} currentUser="1"/>  */}
      <ReviewCards currentValue={currentValue} currentUserId="1"/>
    </>
  )
}

export default Detail
