import React,{useState}from 'react'
import det from "./Detail.module.css"
import {useDispatch} from "react-redux"
import ReviewCard from "./ReviewCard"
import {Formik,Form,ErrorMessage,Field} from "formik";
import { setComent } from '../../redux/features/data/dataSlice';

function Review({currentValue}) {
    const dispatch=useDispatch()
    const [form,setForm]= useState({
        review:"",
    })
  return (
   <> 
     <div className={det.ContainerRev}>
        <Formik
            initialValues={
                {
                    review:"",
                    nameUser:"Name1"
                }
            }
            validate={(v)=>{
                let error={}
                if(!v.review){
                    error.review="Please insert a comentary"
                }
                else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(v.review)){
                    error.review="Review need a comentary"
                }
                return error
            }}
            onSubmit={(v,{resetForm})=>{
                resetForm()
                setForm(v)
                dispatch(setComent(v))
                console.log(form);
                console.log("enviado")
            }}
        >
         {({errors})=>(
            <Form >
               <div className={det.ContainerForm}>
                <div className={det.Container_Det3}>
                    <label >Let your review here</label>
                    <Field
                        type="text"
                        name="review"
                        id="review"
                        placeholder='Customer Review'
                        className={det.Review}
                        as="textarea"
                    />
                    <ErrorMessage name='review' component={()=>(<div>{errors.review}</div>)}/>
                    
                    <button 
                        type="submit"
                        className={det.SubButton}><strong>Submit</strong>
                    </button>
                </div>
                    
                <div>
                    <ReviewCard currentValue={currentValue}/>
                </div>
               </div>
            </Form>
         )}    
        </Formik>
    </div>
   </>
  )
}

export default Review