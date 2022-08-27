import React from 'react'
import { useSelector } from 'react-redux';
import det from "./Detail.module.css"
import Review from './Review';

function ReviewCard({comment,replies,currentUserId,updateComment,deleteComment,activeComment,setActiveComment,parentId= null,addComment}) {
    const {userID}=useSelector(state => state.data)
    const fiveMinutes=300000;
    const timePassed=new Date()- new Date(comment.date)>fiveMinutes
    const canReply=Boolean(currentUserId)
    const canEdit =currentUserId===comment.user && !timePassed
    const canDelete =currentUserId ===comment.user && !timePassed
    const createdAt= new Date(comment.date).toLocaleDateString();
    const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "replying";
    const isEditing =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "editing";
    const replyId= parentId ? parentId : comment._id

  return ( 
    <div className={det.comment}>
        <div>
            <img src={userID.img} alt="avatar" className={det.ImgRedonda}/>
        </div>
        <div className={det.comment_right_part}>
            <div className={det.comment_content}>
                <div className={det.author}>
                    {comment.username}
                </div>
                <div>
                    {createdAt}
                </div>
            </div>

            {!isEditing && <div className={det.comment_text}>
                {comment.content}
            </div>}
            {isEditing && (
                <Review 
                    submitLabel="Edit" 
                    hasCancelButt initialText={comment.content}
                    handleSubmit={(text)=>updateComment(text,comment._id)}
                    handleCancel={()=>setActiveComment(null)}
                    />
            )

            }
            <div className={det.Comment_actions}>
                {canReply && 
                <div className={det.Comment_action}
                     onClick={() =>setActiveComment({id:comment._id, type:"replying"})}>Reply</div>}
                {canEdit &&
                <div className={det.Comment_action}
                     onClick={() =>setActiveComment({id:comment._id,type:"editing"})}>Edit</div>}
                {canDelete && 
                <div className={det.Comment_action} onClick={() =>deleteComment(comment._id)}>Remove</div>}
            </div>
            {isReplying && (<Review submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId)}/>)}
            {replies.length>0 &&(
                <div className={det.replies}>
                    {replies.map(r=>(
                        <ReviewCard 
                        comment={r} 
                        key={r.id} 
                        replies={[]} 
                        currentUserId={currentUserId} 
                        deleteComment={deleteComment} 
                        activeComment={activeComment}
                        updateComment={updateComment}
                        setActiveComment={setActiveComment}
                        parentId={comment._id}
                        addComment={addComment}/>
                    ))}
                </div>
            )}
        </div>
    </div>
    )
}

export default ReviewCard