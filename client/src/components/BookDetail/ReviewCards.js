import React ,{ useEffect,useState }from 'react'
 import {useSelector,useDispatch} from "react-redux"
import det from "./Detail.module.css"
 import { Vaciar } from '../../redux/features/data/dataSlice';
import ReviewCard from './ReviewCard';
import Review from './Review';
import { postComments,DeleteComment,UpdateComment } from '../../redux/features/data/dataSlice';



function ReviewCards({id}) {
     const {comments}=useSelector((state=>state.data))
     const {userID}=useSelector(state => state.data)

    const[back,BackComment]= useState([])

    const[activeComment,setActiveComment]= useState(null)
    const currentUserId=window.localStorage.getItem("user").slice(7,31)
    //const CommentPerBook=comments?.filter(f=>f.book===id)
     const dispatch=useDispatch()
     useEffect(()=>{
          BackComment(comments[0])  
    },[])
    const RootComments= back ? back?.filter(f=>f.parentId===null): BackComment(comments[0])
    const getReplies = commentId=>{
      return back.filter(f=>f.parentId===commentId)
      .sort((a,b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    //console.log(comments[0][0])

  const createComment= (text, parentId = null) => {
      return {
        _id:comments._id,
        content: text,
        parentId,
        user: userID._id,
        username: userID.fullName,
        book:id,
        date: new Date().toISOString(),
      };
    };
   const deleteComments = (commentId) => {
    console.log(commentId)
    const updatedBackComents= back.filter(f=>f._id !==commentId)
    BackComment(updatedBackComents)
    console.log(updatedBackComents)
    };
      
  const updateComments = (text,commentId) => {
    console.log("update",text,commentId)
        const updatedBackComents= back.map(m=>{
          if(m._id=== commentId){
            return {...m, content:text}
          }
          return m
        })
        BackComment(updatedBackComents)
  };
  

    const addComment= (text, parentId)=>{
            BackComment([createComment(text, parentId),...back])
            dispatch(postComments(createComment(text, parentId)))
         setActiveComment(null)
         }
    
    const deleteComment=(commentId)=>{
      if(window.confirm("Are u sure?")){
        console.log(commentId)
        commentId===undefined ? dispatch(DeleteComment(comments[0][0]._id)) : dispatch(DeleteComment(commentId))
        deleteComments(commentId)
      }
    }
    const updateComment=(text,commentId)=>{
      console.log("update",text,commentId)
      commentId===undefined ? dispatch(UpdateComment(comments[0][0]._id,{content: text})) : dispatch(UpdateComment(commentId,{content: text}))
      updateComments(text,commentId)
        setActiveComment(null)
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
              replies={getReplies(r._id)}
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