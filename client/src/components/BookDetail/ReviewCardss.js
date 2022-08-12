import React, {useState,useEffect} from 'react'
import det from "./Detail.module.css"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { postComments } from '../../redux/features/data/dataSlice'

function ReviewCards({hasCancelButt="false",id}) {
    const dispatch= useDispatch()
    const {comments}=useSelector(state => state.data)
    const currentUserId=window.localStorage.getItem("user").slice(7,31)
    let BookId=id
    const his=useNavigate()
   
    const [form,setForm]= useState({
        content:"",
        date:"",
        book:"",
        user:"",
    })
    const isDisable= form.length===0
    
    function handleChange(e){
        setForm({
            content:e.target.value,
            date:new Date().toISOString(),
            book:BookId,
            user:currentUserId})
    }

    function onSubmit(e){
        e.preventDefault()
        dispatch(postComments(form))
        setForm({
            content:"",
            date:"",
            book:"",
            user:"",
         })
         alert("Review Done")
         his("/")
    }
    console.log(comments.data)

  return (
    <>
    <div className={det.ContainerForm}>
    <div className={det.ContainerRev}>
         <form onSubmit={(e)=>onSubmit(e)}
         >
               <div className={det.ContainerForm2}>
                <div className={det.Container_Det3}>
                    <label >Let your review here</label>
                    <textarea
                        value={form.content}
                        placeholder='Customer Review'
                        className={det.Review}
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className={det.ButtonContainer}>
                <button 
                        disabled={isDisable}
                        className={det.comment_form_button}><strong>Write</strong>
                    </button>
                    {hasCancelButt && (
                        <button type="button" className={det.comment_form_button}
                        //onClick={handleCancel}
                        >cancel</button>
                    )}
                </div>
               </div>
            </form>
    </div>
    <div className={det.Container_Det4}>
        <h3 className={det.comments_title}>Comments</h3>
        <div className={det.comment}>
            <div>
                <img src="https://play-lh.googleusercontent.com/xlnwmXFvzc9Avfl1ppJVURc7f3WynHvlA749D1lPjT-_bxycZIj3mODkNV_GfIKOYJmG" alt="not found" className={det.ImgRedonda}/>
            </div>
            <div className={det.comment_right_part}>
                <div className={det.comment_content}>
                <div className={det.comment_text}>
                    {comments.map((c,key)=>{
                        return <div key={key}>
                            {c.content}
                            </div>
                    })}
                </div>
                </div>
            </div>
        </div>
        
    </div>
    </div>
    </>
  )
}

export default ReviewCards