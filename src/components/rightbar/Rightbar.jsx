import "./rightbar.css";


import { useContext, useEffect, useState ,useRef} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import ChatOnline from "../chatOnline/ChatOnline";
import { io } from "socket.io-client";



export default function Rightbar({ user } ) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  
  
  console.log(currentUser)
  const [followed, setFollowed] = useState(
    
     currentUser.followings.includes(user?.id)
  );
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    
  }, []);
  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        currentUser.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [currentUser.followings]);
  
  

  useEffect(() => {
    const getFriends = async () => {
      try {
        console.log(currentUser._id)
        const friendList = await axios.get("/users/friends/" + currentUser._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser._id]);

  const handleClick = async () => {
    try {
      if (followed) {
        console.log("followed")
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        console.log("not followed")
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    }
    
     catch (err) {
    }
  };

     const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Alaa Abid</b> et <b>3 autres amis</b>fêtent leur anniversaires.
          </span>
        </div>
        <img className="rightbarAd" src="assets/cit.jpg" alt="" />
        <h4 className="rightbarTitle">Amis en ligne</h4>
        <ul className="rightbarFriendList">
          <Link to={"/messenger"} style={{textDecoration:"none"}}>
          <ChatOnline onlineUsers={onlineUsers} currentId={currentUser._id} className="chatOnline"/>
          </Link>
        </ul>
      </>
    );
  };
    
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Retier ami" : "Ajouter ami"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        {user.username !== currentUser.username && (
          <button className="rightbarReportButton" >
            Signaler
          </button>
        )}
        <h4 className="rightbarTitle">Information étudiant</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Université :</span>
            <span className="rightbarInfoValue">{user.School}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Filière : </span>
            <span className="rightbarInfoValue">{user.Filier}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Email :</span>
            <span className="rightbarInfoValue">{user.email}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">Liste d'amis</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
    return (
         <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  );
}
