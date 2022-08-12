import React ,{ useEffect,useState }from 'react'
 import {useSelector,useDispatch} from "react-redux"
import det from "./Detail.module.css"
// import { setComent } from '../../redux/features/data/dataSlice';
import {createComment,deleteComment as deleteCommentary,updateComment as updateComments} from "./comments"
import ReviewCard from './ReviewCard';
import Review from './Review';
import { Comments,postComments } from '../../redux/features/data/dataSlice';



function ReviewCards({id}) {
     const {comments}=useSelector((state=>state.data))
    const[back,BackComment]= useState([])
    const[activeComment,setActiveComment]= useState(null)
    const currentUserId=window.localStorage.getItem("user").slice(7,31)
    console.log(back);
    
    const RootComments=back.filter(f=>f.parentId===null)
     const dispatch=useDispatch()
     useEffect(()=>{
          BackComment(comments)
    },[])
    const getReplies = commentId=>{
      return back.filter(f=>f.parentId===commentId)
      .sort((a,b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    const addComment= (text, parentId)=>{
      console.log("addComment",text, parentId)
       createComment(text, parentId).then(comment=>{
            BackComment([comment,...back])
            dispatch(postComments(BackComment))
         setActiveComment(null)
         })
    }
    const deleteComment=(commentId)=>{
      if(window.confirm("Are u sure?")){
        deleteCommentary(commentId).then(()=>{
          const updatedBackComents= back.filter(f=>f.id !==commentId)
          BackComment(updatedBackComents)
          
        })
      }
    }
    const updateComment=(text,commentId)=>{
      updateComments(text).then(()=>{
        const updatedBackComents= back.map(m=>{
          if(m.id=== commentId){
            return {...m, body:text}
          }
          return m
        })
        BackComment(updatedBackComents)
        setActiveComment(null)
      })
    }
  return ( 
    <>
    <div className={det.ContainerForm}>
      <div className={det.Container_Det4}>
        <h3 className={det.comments_title}>Comments</h3>
          <div>
            {RootComments.map(r=>(
            <ReviewCard 
              key={r.id} 
              comment={r} 
              replies={getReplies(r.id)}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              activeComment={activeComment}
              updateComment={updateComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              />
            ))}
          </div>
      </div>
        <Review submitLabel="write" handleSubmit={addComment}/>
      </div>

    </>
  )
}

export default ReviewCards