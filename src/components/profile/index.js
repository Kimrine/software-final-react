/**
 * @file Profile component for display profile page of a user
 * Profile page contains links to my-tuits, my-likes, my-dislikes
 */
import React, {useEffect, useState} from "react";
import MyTuits from "./my-tuits";
import {
    HashRouter,
    Link,
    Route,
    Routes,
    useNavigate,
    useLocation,
    useParams
} from "react-router-dom";
import * as service from "../../services/auth-service"
import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";

const Profile = () => {
    const {username} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState({});
    const [currentUser,setCurrentUser] = useState({});

    useEffect(async () => {

        try {
                let user = await service.profile();
                setCurrentUser(user);
                if(username!==user.username){
                    user = await service.findUser(username);
                }

                setProfile(user);

        } catch (e) {
            navigate('/login');
        }
    }, []);
    const logout = () => {
        service.logout()
            .then(() => navigate('/login'));
    }
    return(
        <div className="ttr-profile">
            <div className="border border-bottom-0">
                <h4 className="p-2 mb-0 pb-0 fw-bolder">
                    {profile.username}
                    <i className="fa fa-badge-check text-primary"></i></h4>
                <span className="ps-2">67.6K Tuits</span>
                <div className="mb-5 position-relative">
                    <img className="w-100" src="../images/nasa-profile-header.jpg"/>
                    <div className="bottom-0 left-0 position-absolute">
                        <div className="position-relative">
                            <img className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px"
                                 src="../images/nasa-3.png"/>
                        </div>
                    </div>
                    {
                        profile.username === currentUser.username
                        &&<div>
                            <Link to="/profile/edit" className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
                                Edit profile
                            </Link>
                            <button onClick={logout} className="mt-2 float-end btn btn-warning rounded-pill">
                                Logout
                            </button>
                        </div>

                    }
                    {
                        profile.username !== currentUser.username &&
                        <div>
                            <button className="mt-2 me-2 float-end btn btn-warning rounded-pill">
                                  Follow
                            </button>
                        </div>

                    }
                </div>

                <div className="p-2">
                    <h4 className="fw-bolder pb-0 mb-0">
                        {profile.username}<i className="fa fa-badge-check text-primary"></i>
                    </h4>
                    <h6 className="pt-0">@{profile.username}</h6>
                    <p className="pt-2">
                        There's space for everybody. Sparkles
                    </p>
                    <p>
                        <i className="far fa-location-dot me-2"></i>
                        Pale Blue Dot
                        <i className="far fa-link ms-3 me-2"></i>
                        <a href="nasa.gov" className="text-decoration-none">nasa.gov</a>
                        <i className="far fa-balloon ms-3 me-2"></i>
                        Born October 1, 1958
                        <br/>
                        <i className="far fa-calendar me-2"></i>
                        Joined December 2007
                    </p>
                    <b>178</b> Following
                    <b className="ms-4">51.1M</b> Followers
                    <ul className="mt-4 nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link to={`/profile/${profile.username}/mytuits`}
                                  className={`nav-link ${location.pathname.indexOf('mytuits') >= 0 ? 'active':''}`}>
                                Tuits</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/profile/${profile.username}/mylikes`}
                                  className={`nav-link ${location.pathname.indexOf('mylikes') >= 0 ? 'active':''}`}>
                                Likes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/profile/${profile.username}/mydislikes`}
                                  className={`nav-link ${location.pathname.indexOf('dislikes') >= 0 ? 'active':''}`}>
                                Dislikes</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/mytuits" element={<MyTuits username={profile.username}/>}/>
                <Route path="/mylikes" element={<MyLikes username={profile.username}/>}/>
                <Route path="/mydislikes" element={<MyDislikes username={profile.username}/>}/>
            </Routes>
        </div>
    );
}
export default Profile;