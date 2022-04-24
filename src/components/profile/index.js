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
import * as authService from "../../services/auth-service"
import * as followService from "../../services/follow-service"

import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";
import MyMedia from "./my-medias"

const Profile = () => {
    const {username} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState({});
    const [currentUser,setCurrentUser] = useState({});

    useEffect(async () => {
        try {
                let user = await authService.profile();
                setCurrentUser(user);
                if(username!==user.username){
                    user = await authService.findUser(username);
                }else{
                    user = await authService.findUser(username);
                    setCurrentUser(user);
                }
                setProfile(user);
        } catch (e) {
            navigate('/login');
        }
    }, [username]);

    /**
     * Current user logout
     */
    const logout = () => {
        authService.logout()
            .then(() => navigate('/login'));
    }

    /**
     * A call back method to refresh user's information
     * @returns {Promise<void>}
     */
    const refreshUser = async () => {
        let user = await authService.findUser(username);
        setProfile(user);
    }

    /**
     * If enter in others profile, current user follow this user
     * @returns {Promise<void>}
     */
    const followUser = async () => {
        followService.userTogglesUserFollows(currentUser._id, profile._id)
            .then(refreshUser)
            .catch(e => alert(e));
    }


    const follow = "Follow";
    const unfollow = "Unfollow";
    return(
        <div className="ttr-profile">
            <div className="border border-bottom-0">
                <h4 className="p-2 mb-0 pb-0 fw-bolder">
                    {profile.username}
                    <i className="fa fa-badge-check text-primary"></i></h4>
                <span className="ps-2">67.6K Tuits</span>
                <div className="mb-5 position-relative">
                    <img className="w-100 pf-header-image" src={profile.headerImage===undefined?"../images/nasa-profile-header.jpg":`${profile.headerImage}`}/>
                    <div className="bottom-0 left-0 position-absolute">
                        <div className="position-relative">
                            <img className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px pf-profile-image"
                                 src={profile.profilePhoto===undefined?"":`${profile.profilePhoto}`}/>
                        </div>
                    </div>
                    {
                        profile.username === currentUser.username
                        &&<div>
                            <Link to={`/profile/${profile.username}/edit`}
                                  className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
                                Edit profile
                            </Link>
                            <button type="button" onClick={logout} className="mt-2 float-end btn btn-warning rounded-pill">
                                Logout
                            </button>
                        </div>

                    }
                    {
                        profile.username !== currentUser.username &&
                        <div>
                            <button onClick={followUser} className="mt-2 me-3 float-end btn btn-primary rounded-pill">
                                {
                                    profile.followedByMe && unfollow
                                }
                                {
                                    profile.followedByMe === false && follow
                                }
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
                        {
                            profile.biography && <span>{profile.biography}</span>
                        }
                        {
                            profile.biography===undefined &&
                            <span>Have a nice day!</span>
                        }

                    </p>
                    <p>
                        <i className="far fa-location-dot me-2"></i>
                        Pale Blue Dot
                        <i className="far fa-link ms-3 me-2"></i>
                        <a href="nasa.gov" className="text-decoration-none">nasa.gov</a>
                        <i className="far fa-balloon ms-3 me-2"></i>
                        Born {profile.dateOfBirth===undefined&&<span>1958-10-1</span>}
                        {profile.dateOfBirth!==undefined&&<span>{profile.dateOfBirth.substring(0,10)}</span>}
                        <br/>
                        <i className="far fa-calendar me-2"></i>
                        Joined {profile.joined!==undefined&&<span>{profile.joined.substring(0,10)}</span>}
                    </p>
                    <Link to={`/profile/${profile.username}/following` } className="text-decoration-none"><b>{profile.followings}</b> Following</Link>
                    <Link to={`/profile/${profile.username}/followers`} className="text-decoration-none"><b className="ms-4">{profile.followers}</b> Followers</Link>
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
                        <li className="nav-item">
                            <Link to={`/profile/${profile.username}/mymedias`}
                                  className={`nav-link ${location.pathname.indexOf('medias') >= 0 ? 'active':''}`}>
                                Medias</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/mytuits" element={<MyTuits username={profile.username}/>}/>
                <Route path="/mylikes" element={<MyLikes username={profile.username}/>}/>
                <Route path="/mydislikes" element={<MyDislikes username={profile.username}/>}/>
                <Route path="/mymedias" element={<MyMedia username={profile.username}/>}/>
            </Routes>
        </div>
    );
}
export default Profile;