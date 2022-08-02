import React from 'react'
import {useSelector} from "react-redux"

function ReviewCard({currentValue,form}) {
    const {comments}=useSelector((state=>state.data))
  return (
    <>
        <div>
            <div>NameUser</div>
            <div>Rating: {currentValue}</div>
            <p>{comments.map(e=>{
              return(<li>{e.review}</li>)
            })}</p>
        </div>
    </>
  )
}

export default ReviewCard