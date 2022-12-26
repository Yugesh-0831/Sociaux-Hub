import React from 'react';
import "./home.css"
import TopBar from '../../components/topbar/TopBar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';

function Home(){
        return (
            <>
                <TopBar/>
                <div className="homeContainer">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
                </div>
            </>
        );
}

export default Home;