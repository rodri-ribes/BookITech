import React from 'react'
import {useSelector} from "react-redux"
import det from "./Detail.module.css"

function ReviewCard({currentValue}) {
    const {comments}=useSelector((state=>state.data))
  return (
    <>
      {console.log(comments)}
        <div className={det.Container_Det4}>
          <div className={det.Container_Det5}>
            <h2 className={det.Title1}>{comments.map(e=>{
              return(<li className={det.List1}>{e.nameUser}</li>)
            })}</h2>
            <img src="https://play-lh.googleusercontent.com/xlnwmXFvzc9Avfl1ppJVURc7f3WynHvlA749D1lPjT-_bxycZIj3mODkNV_GfIKOYJmG" alt="not found" className={det.ImgRedonda}/>
          </div>
            <h4>Rating: {currentValue}</h4>
            <p>{comments.map(e=>{
              return(<li className={det.List1}>{e.review}</li>)
            })}</p>
        </div>
    </>
  )
}

export default ReviewCard