import React,{useState}from 'react'
import det from "./Detail.module.css"
// import {useDispatch,useSelector} from "react-redux"
// import { setComent } from '../../redux/features/data/dataSlice';

function Review({handleSubmit,submitLabel,hasCancelButt=false,initialText="",handleCancel}) {
    // const {comments}=useSelector((state=>state.data))
    // const dispatch=useDispatch()
    const [form,setForm]= useState(initialText)
    const isDisable= form.length===0

    const onSubmit =e =>{
        e.preventDefault()
        handleSubmit(form)
        setForm("")
    }
   
  return (
   <> 
     <div className={det.ContainerRev}>
            <form onSubmit={onSubmit}>
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
                        className={det.comment_form_button}><strong>{submitLabel}</strong>
                    </button>
                    {hasCancelButt && (
                        <button type="button" className={det.comment_form_button}
                        onClick={handleCancel}>cancel</button>
                    )}
                </div>
               </div>
            </form>    
    </div>
   </>
  )
}

export default Review