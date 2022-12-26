import "./profile.css"
import TopBar from '../../components/topbar/TopBar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import { useParams } from "react-router";
import { useState,useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
  
    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(`/users?username=${username}`);
        
        setUser(res.data);
      };
      fetchUser();
    }, [username]);
    return (
            <>
                <TopBar/>
                <div className="profile">
                    <Sidebar/>
                    <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                    <img src={user.coverPicture ? PF+user.coverPicture : PF+"person/noCover.png"} className="profileCoverImg" alt=""/>
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} className="profileUserImg" alt=""/>
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{user.username}</h4>
                        <span className="profileInfoDesc">{user.desc}</span>
                    </div>
                </div>
                        <div className="profileRightBottom">
                           <Feed username={username}/>
                           <Rightbar user={user}/>
                        </div>
                    </div>
                </div>
            </>
    );
};

export default Profile; 