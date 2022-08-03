import React ,{ useEffect,useState }from 'react'
// import {useSelector,useDispatch} from "react-redux"
import det from "./Detail.module.css"
// import { setComent } from '../../redux/features/data/dataSlice';
import {getComments,createComment,deleteComment as deleteCommentary,updateComment as updateComments} from "./comments"
import ReviewCard from './ReviewCard';
import Review from './Review';



function ReviewCards({currentValue,currentUserId}) {
    // const {comments}=useSelector((state=>state.data))
    const[back,BackComment]= useState([])
    const[activeComment,setActiveComment]= useState(null)
    
    const RootComments=back.filter(f=>f.parentId===null)
    // const dispatch=useDispatch()
    useEffect(()=>{
        getComments().then(data=>{
          // dispatch(setComent(data))
          BackComment(data)
        })
    },[])
    const getReplies = commentId=>{
      return back.filter(f=>f.parentId===commentId)
      .sort((a,b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    const addComment= (text, parentId)=>{
      console.log("addComment",text, parentId)
       createComment(text, parentId).then(comment=>{
            // dispatch(setComent(c,back))
         BackComment([comment,...back])
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
        {/* <div className={det.Container_Det4}>
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
        </div> */}
    </>
  )
}

export default ReviewCards