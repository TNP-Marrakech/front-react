import NouveauFile from "./NouveauFile"
import Sidebaritems from "./Sidebaritems";
import "./revsidebar.css"
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import StorageIcon from '@material-ui/icons/Storage';
export default function Revsidebar() {
    return (
        <div className='sidebar'>
       <NouveauFile/>
       <div className="sidebar__itemsContainer">
                <Sidebaritems arrow icon={(<InsertDriveFileIcon />)} label={'Mes Cours'} />
                <Sidebaritems icon={(<PeopleAltIcon />)} label={'Cours partagé'} />
                <Sidebaritems icon={(<DeleteOutlineIcon />)} label={'Bin'} />
                
                <hr/>
                
                <Sidebaritems icon={(<StorageIcon />)} label={'Stockage'} />

            </div>
        </div>
       )
}
