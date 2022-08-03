import React from 'react'
import det from "./Detail.module.css"
import Review from './Review';

function ReviewCard({comment,replies,currentUserId,updateComment,deleteComment,activeComment,setActiveComment,parentId= null,addComment}) {
    const fiveMinutes=300000;
    const timePassed=new Date()- new Date(comment.createdAt)>fiveMinutes
    const canReply=Boolean(currentUserId)
    const canEdit =currentUserId===comment.userId && !timePassed
    const canDelete =currentUserId ===comment.userId && !timePassed
    const createdAt= new Date(comment.createdAt).toLocaleDateString();
    const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
    const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
    const replyId= parentId?parentId:comment.id
  return ( 
    <div className={det.comment}>
        <div>
            <img src="https://play-lh.googleusercontent.com/xlnwmXFvzc9Avfl1ppJVURc7f3WynHvlA749D1lPjT-_bxycZIj3mODkNV_GfIKOYJmG" alt="not found" className={det.ImgRedonda}/>
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
                {comment.body}
            </div>}
            {isEditing && (
                <Review 
                    submitLabel="Edit" 
                    hasCancelButt initialText={comment.body}
                    handleSubmit={(text)=>updateComment(text,comment.id)}
                    handleCancel={()=>setActiveComment(null)}
                    />
            )

            }
            <div className={det.Comment_actions}>
                {canReply && 
                <div className={det.Comment_action}
                     onClick={() =>setActiveComment({id:comment.id, type:"replying"})}>Reply</div>}
                {canEdit && 
                <div className={det.Comment_action}
                     onClick={() =>setActiveComment({id:comment.id,type:"editing"})}>Edit</div>}
                {canDelete && 
                <div className={det.Comment_action} onClick={() =>deleteComment(comment.id)}>Remove</div>}
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
                        parentId={comment.id}
                        addComment={addComment}/>
                    ))}
                </div>
            )}
        </div>
    </div>
    )
}

export default ReviewCard