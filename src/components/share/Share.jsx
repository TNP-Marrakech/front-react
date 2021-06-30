import "./share.css";
import {
  PermMedia,
  
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AttachFileIcon from '@material-ui/icons/AttachFile';

export default function Share() {
    const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
    //Créer poste
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    
    if (file) {
        const data = new FormData();
        //pour éviter les conflits si deux utilisateurs upload une image avec le meme nom 
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        newPost.img = fileName;
        console.log(newPost);
        try {
          await axios.post("/upload", data);
        } catch (err) {}
      }

    //Envoyer Poste
    try {
        await axios.post("/posts", newPost);
        //refresh page after adding a post 
        window.location.reload();
      } catch (err) {}
    };

    return (
        <div  className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src= {user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png" } alt="" />
                    <input placeholder="“La connaissance, c'est partager le savoir qui nous fait grandir.” " className="shareInput" ref={desc} />
                </div>
                <hr className="shareHr"/>
                {file && (
                <div className="shareImgContainer">
                <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                </div>
        )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo ou Video</span>
                            <input 
                            style={{display:"none"}}
                            type="file" 
                            id="file" 
                            accept=".png,.jpeg,.jpg" 
                            onChange={(e) => setFile(e.target.files[0])}/>
                        </label>
                        <div  className="shareOption">
                          <label htmlFor="file" className="shareOption">
                            <AttachFileIcon htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Fichier</span>
                            <input 
                            style={{display:"none"}}
                            type="file" 
                            id="file" 
                            accept=".pdf,.docx" 
                            onChange={(e) => setFile(e.target.files[0])}/>
                        </label>
                        </div>
                        
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Emotions</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Partager</button>
                </form>
            </div>
        </div>
    )
}
