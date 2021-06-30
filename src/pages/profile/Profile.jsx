import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import  { useEffect, useState ,useRef} from "react";
import axios from "axios";
import{useParams} from "react-router";
  
  import {Cancel} from "@material-ui/icons";


export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser] = useState({});
  const username = useParams().username;
  const description = useRef();

  useEffect(()=>{
    const fetchUser = async () => {
  const res = await axios.get(`/users?username=${username}`) ;
  console.log(res)
  setUser(res.data)
    };
    fetchUser();
},[username]);
console.log("vfvfvfvfvfvfv"+username)
console.log(user.username)
const doubleclickhandle =  (e) => {
  <div> 
  <textarea placeholder="Entrer une description" ref={description} ></textarea>
  <button onClick={handleClick} >enregistrer</button>
  </div>
}

const handleClick = async (e) => {
  const userupdate = {
    description:description.current.value,
    isAdmin:true
  };
  console.log(user._id)
  await axios.put(("/users/" + user._id),userupdate)
  window.location.reload();
}

    return (
        <>
        
        <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/background.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                { user.description 
                ? 
                (<div className="description">
                <span className="profileInfoDesc" onDoubleClick={doubleclickhandle}>{user.description}</span>
                
                  </div>
                )
                :(<div> 
                <textarea placeholder="Entrer une description" ref={description} ></textarea>
                <button onClick={handleClick} >enregistrer</button>
                </div>
                )

                }
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
    )
              }
