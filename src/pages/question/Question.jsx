import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed2 from "../../components/feed2/Feed2"

import "./question.css"



export default function Home() {
    return( 
        //fragments
        <>
        
            <Topbar/>
            <div className="homeContainer">
            <Sidebar/>
            <Feed2/>
            <Rightbar/>
            </div>
        </>
        );
        

}