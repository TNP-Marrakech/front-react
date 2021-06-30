import "./sidebar.css"
import {
    RssFeed,
    Chat,
    
    Group,
    
    HelpOutline,
    WorkOutline,
    Event,
    School,
    
  } from "@material-ui/icons";
  import GroupWorkIcon from '@material-ui/icons/GroupWork';
  import {Users} from "../../dummyData"
import CloseFriend from "../closeFriend/CloseFriend";
import {Link, Redirect} from "react-router-dom";
export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                  <Link onClick={()=> window.open("https://www.9rayti.com/actualites", "_blank")} style={{textDecoration:"none"}}>
                <li className="sidebarListItem">

            <RssFeed className="sidebarIcon"/>
            <span className="sidebarListItemText">Actualités</span>
          </li>
          </Link>
          <Link to="/messenger" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Espace Discussion</span>
          </li>
          </Link>
          <Link to="/revision" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
            <GroupWorkIcon className="sidebarIcon" />
            <span className="sidebarListItemText"> Salon Révision</span>
          </li>
          </Link>
          <Link to="/" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groupes</span>
          </li>
          </Link>
          <Link to="" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          </Link>
          <Link onClick={()=> window.open("https://www.emploi.ma/", "_blank")} style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Offres d'emploi</span>
          </li>
          </Link>
          <Link onClick={()=> window.open("https://www.9rayti.com/evenements", "_blank")} style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Evénements</span>
          </li>
          </Link>
          <Link to="" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Cours et Formations</span>
          </li>
          </Link>
        </ul>
        <button className="sidebarButton">Afficher plus</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
            {Users.map(u=>(
              <CloseFriend key={u.id} user={u}/>
            ))}
            
        </ul>
            </div>
        </div>
    )
}
