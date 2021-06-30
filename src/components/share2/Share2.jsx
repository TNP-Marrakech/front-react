import "./share2.css";

import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


export default function Share() {
    const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const question = useRef();
  
    //Créer question
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      question: question.current.value,
    };
    
    

    //Envoyer Poste
    try {
        await axios.post("/questions", newPost);
        //refresh page after adding a post 
        window.location.reload();
      } catch (err) {}
    };

    return (
        <div  className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src= {user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png" } alt="" />
                    <input placeholder="“La connaissance, c'est partager le savoir qui nous fait grandir.” " className="shareInput" ref={question} />
                </div>
                <hr className="shareHr"/>
                <form className="shareBottom" onSubmit={submitHandler}>
                    <button className="shareButton" type="submit">Partager</button>
                </form>
            </div>
        </div>
    )
}
