import "../quest/Quest"

import "./feed2.css";
import  { useEffect, useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Quest from "../quest/Quest.jsx";
import Share2 from "../share2/Share2.jsx"


export default function Feed({username}) {
    const [questions,setQuestions] = useState([]);
    const {user} = useContext(AuthContext)
    useEffect(()=>{
      const fetchQuestions = async () => {
      const res = username 
                
                await axios.get("questions/timeline/" + user._id);
      
      setQuestions(
          //to sort posts
          //Sort algorithme
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchQuestions();
  }, [ user._id]);
    return (
        <div className="feed">
            <div className="feedWrapper">
                 {(!username  || username === user.username) && <Share2/> }
                {questions.map((p) =>(  
                  <Quest key={p._id} question={p}/>  
                ))}
                
             
            </div>
        </div>
    );
}