import React, {useState, useEffect} from 'react'
import style from './CommentBox.module.css'
import axios from 'axios'
const {REACT_APP_API} = process.env


export default function CommentBox({ setComment, handleComment, setDetails, comment, error }) {

     
    const [userIsBanned, setUserIsBanned] = useState(
        {
            banned: false,
            permanent: false,
            daysRemaining: 0
        })
    let user;
    let [User, setUser]=useState()
    

    if (window.localStorage.getItem("user") === null) {
        user = [0, "user.png", "user"]
    } else {
        let usuario = JSON.parse(window.localStorage.getItem("user"))
        user = [usuario.id, usuario.img, usuario.name]
    }
    
    const getdata = async () => {
        let userId = JSON.parse(window.localStorage.getItem("user"));
        try {
            let data = await axios.get(REACT_APP_API + `/user/${userId.id}`);
            setUser(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getdata()
    },[])

    async function checkUserIsBanned() {

        const {data} = await axios.get(REACT_APP_API +'/user/isbanned/' + user[0])
        const userBannedStatus = data
        console.log("data", userBannedStatus)
        if(!userBannedStatus) return false
        if(userBannedStatus.banned == false) return 
        if(userBannedStatus.banned == 'permanent') {
            setUserIsBanned({banned: true, permanent: true, daysRemaining: 0})
        } else setUserIsBanned({banned: true, permanent: false, daysRemaining: userBannedStatus.banned})

        return
    }

    useEffect(()=> {
        checkUserIsBanned()
    }, [])

    return (
        <div className={style.Container}>
            <img src={user[1]} alt={user[2]} />
            <div className={style.Container__input}>
                <h3>{user[2]}</h3>
                <textarea type="text" value={comment} onChange={e => setComment(e.target.value) } disabled={userIsBanned.banned} />
                {error.error === "comment" ? <p className={style.error}>{error.content}</p> : null}
                {userIsBanned.banned && <p className={style.error}> you can't leave any comments because you are banned.</p>}
                {userIsBanned.banned && userIsBanned.permanent != true && <p className={style.error}> The ban expires in {userIsBanned.daysRemaining} days </p>}
                <button onClick={() => handleComment(setDetails)}>Comment</button>
            </div>
        </div>
    )
}