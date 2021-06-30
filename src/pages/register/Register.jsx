import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import {Link} from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const school = useRef();
  const filier = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const emailValide=new RegExp("^[a-zA-Z0-9]+@edu.+\.ma");

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("les mots de passe ne correspondent pas ");
      
    } else if (!emailValide.test(email.current.value)) {
      console.log(emailValide.test(email.current.value))
      email.current.setCustomValidity("Email universitaire incorrect")
    }
    else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        School:school.current.value,
        Filier:filier.current.value,
      };
      try {
        console.log(user)
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Netsos</h3>
          <span className="loginDesc">
            Inscription
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Nom Complet*"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email ex: prenom.nom@edu.***.ma*"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Université*"
              required
              ref={school}
              className="loginInput"
            />
            <input
              placeholder="Filière*"
              required
              ref={filier}
              className="loginInput"
            />
            <input
              placeholder="Mot de passe*"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="retaper mot de passe*"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            
            <button className="loginButton" type="submit">
              S'inscrire
            </button>
            <Link to={"/login"}>
            <button className="loginRegisterButton">Se Connecter</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}