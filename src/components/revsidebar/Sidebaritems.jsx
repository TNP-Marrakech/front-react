import React from 'react'
import "./sidebaritems.css";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
export default function Sidebaritems({ arrow, icon, label }) {
    return (
        <div className='sidebarItem'>
        <div className="sidebarItem__arrow">
            {arrow && (<ArrowRightIcon />)}
        </div>
        
        <div className='sidebarItem__main'>
            {icon}
            <p>{label}</p>
        </div>
    </div>
    )
}
