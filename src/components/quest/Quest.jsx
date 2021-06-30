import "./quest.css";

import { MoreVert } from "@material-ui/icons";
import  { useEffect, useState,useContext } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import {format} from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

export default function Quest({question}) {
    
  
  const [user,setUser] = useState({});
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser} = useContext(AuthContext)

  
  useEffect(()=>{
    const fetchUser = async () => {
  const res = await axios.get(`/users?userId=${question.userId}`) ;
  console.log(res)
  setUser(res.data)
    };
    fetchUser();
},[question.userId]);

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                        <img className="postProfileImg" src= {user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png" } alt="" />
                        </Link>
                        <span className="postUsername">
                            {user.username}
                            </span>
                        <span className="postDate">{format(question.createdAt,'fr-FR')}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{question.question}</span>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText"> commentaires</span>
                        <span className="postCommentText">Signaler</span>
                    </div>
                </div>
            </div>
        </div>
    )
}