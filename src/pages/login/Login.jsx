import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import {Link} from "react-router-dom";
export default function Login() {
  //hook
  const email = useRef();
  const password = useRef();
  const { user , isFetching,  dispatch } = useContext(AuthContext);


  const handleClick = (e) => {
    
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    
  };
  
  return (
    <div className="login">
        
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Netsos</h3>
          <span className="loginDesc">
            Ici pour partager l'information avec les autres gratuitement.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" className="loginInput" ref={email} required/>
            <input placeholder="Password" type="password" className="loginInput" ref={password}  required minLength="6"/>
            <button className="loginButton" disabled={isFetching} >{isFetching ? <CircularProgress color="white" size="20px"/> : "Se Connecter"}</button>
            <span className="loginForgot">Mot de passe oublié ?</span>
             </form>
             <Link to= "/register">
             <button className="loginRegisterButton">
            {isFetching ? <CircularProgress color="white" size="20px"/> : "Créer Votre Compte"}
            </button>
            </Link>
            
        </div>
      </div>
    </div>
  );
}