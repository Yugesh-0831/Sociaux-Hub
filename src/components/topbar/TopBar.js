import { Search,Person, Chat, Notifications } from "@material-ui/icons";
import "./topbar.css"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";

const TopBar = () => {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

    const logout=()=>{
        window.localStorage.clear();
        navigate("/login");
        window.location.reload();
    }

    return (
        <div className = "topbarContainer">
            <div className = "topbarLeft">
                <Link to = "/" style={{textDecoration:"none"}}>
                <span className = "logo" >
                    SnapBook
                </span>
                </Link>
            </div>
            <div className = "topbarCenter">
                <div className = "searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for friends, posts or videos" className="searchInput" />
                </div>
            </div>
            <div className = "topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">HomePage</span>
                <span className="topbarLink">Timeline</span>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <Person/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <Chat/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <Notifications/>
                    <span className="topbarIconBadge">1</span>
                </div>
            </div>
            <Link to= {`profile/${user.username}`}> 
            <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" className="topbarImg"/>
            </Link>
            <button onClick={logout}>logout</button>
            </div>
        </div>
    );
};

export default TopBar;