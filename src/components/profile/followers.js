import * as service from "../../services/follow-service";
import {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {findAllUsersFollowers} from "../../services/follow-service";
import {FollowList} from "../follows";

const Followers = () => {
    const {username} = useParams();
    const location = useLocation();
    const [followersUser,setFollowersUsers] = useState([]);

    const findUserFollowers = () => service.findAllUsersFollowers(username)
        .then((users)=>setFollowersUsers(users));

    useEffect(findUserFollowers,[]);
    console.log(followersUser.map(user=>user));


    return(
        <div>
            <div>
                <div className="pf-float-left pf-margin16">
                    <Link to={`/profile/${username}`}><span className="fas fa-arrow-left"></span></Link>
                </div>
                <div className="pf-float-left pf-margin-left16">
                    <span className="pf-title"><b>{username}</b></span><br/>
                    <span className="pf-handle pf-font">@{username}</span>
                </div>
                <div className="pf-clear"></div>
            </div>
            <ul className="mt-4 nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link to={`/profile/${username}/followers`}
                          className={`nav-link ${location.pathname.indexOf('follower') >= 0 ? 'active':''}`}>
                        Followers</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/profile/${username}/following`}
                          className={`nav-link ${location.pathname.indexOf('following') >= 0 ? 'active':''}`}>
                        Followings</Link>
                </li>

            </ul>

            <FollowList users={followersUser} refreshUser={findUserFollowers} />

        </div>


    )


};

export default Followers;