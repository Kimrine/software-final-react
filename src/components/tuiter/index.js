import React, {useEffect, useState} from "react";
import Navigation from "../navigation";
import WhatsHappening from "../whats-happening";
import {BrowserRouter, Routes, Route, HashRouter, useNavigate} from "react-router-dom";
import Home from "../home";
import Bookmarks from "../bookmarks";
import Profile from "../profile";
import './tuiter.css'
import EditProfile from "../profile/edit-profile";
import Explore from "../explore";
import Notifications from "../notifications";
import Messages from "../messages";
import Lists from "../lists";
import More from "../more";
import {Login} from "../profile/login";
import Signup from "../profile/signup";
import * as service from "../../services/auth-service";
import Following from "../profile/following";
import Followers from "../profile/followers";
import WhoToFollowList from "../whotofollowlist";
import MyHome from "../home/my-home";

function Tuiter () {


  return(
    <HashRouter>
      <div className="container">
        <div className="ttr-tuiter">
          <div className="ttr-left-column">
            <Navigation/>
          </div>
          <div className="ttr-center-column">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/tuiter" element={<Home/>}/>
              <Route path="/tuiter/:uid" element={<Home/>}/>
              <Route path="/home" element={<MyHome/>}/>
              <Route path="/home/:uid" element={<MyHome/>}/>
              <Route path="/explore" element={<Explore/>}/>
              <Route path="/notifications" element={<Notifications/>}/>
              <Route path="/messages" element={<Messages/>}/>
              <Route path="/bookmarks" element={<Bookmarks/>}/>
              <Route path="/lists" element={<Lists/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/profile/:username/edit" element={<EditProfile/>}/>
              <Route path="/profile/:username" element={<Profile/>}/>
              <Route path="/profile/:username/following" element={<Following/>}/>
              <Route path="/profile/:username/followers" element={<Followers/>}/>
              <Route path="/profile/:username/*" element={<Profile />}/>

              <Route path="/more" element={<More/>}/>
            </Routes>
          </div>
          <div className="ttr-right-column">
            <WhatsHappening/>
            <div className="d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4 col-xxl-3">
              <WhoToFollowList/>
            </div>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
export default Tuiter;