import React, {useState,useEffect} from 'react'
import det from "./Detail.module.css"
import { useSelector, useDispatch } from "react-redux"
import { postComments } from '../../redux/features/data/dataSlice'

function ReviewCards(hasCancelButt="false",id) {
    const dispatch= useDispatch()
    const [form,setForm]= useState("")
    const {comments}=useSelector(state => state.data)
    const isDisable= form.length===0
    
    function onSubmit(e){
        e.preventDefault()
        dispatch(postComments(form))
        setForm("")
    }
    

  return (
    <>
    <div className={det.ContainerForm}>
    <div className={det.ContainerRev}>
         <form onSubmit={onSubmit}
         >
               <div className={det.ContainerForm2}>
                <div className={det.Container_Det3}>
                    <label >Let your review here</label>
                    <textarea
                        value={form}
                        placeholder='Customer Review'
                        className={det.Review}
                        onChange={(e)=>setForm(e.target.value)}
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
        {comments.map((c,key)=>{
            return <div key={key}>
                {c.content}
                   </div>
        })}
        
    </div>
    </div>
    </>
  )
}

export default ReviewCards