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
            <h2>Followers</h2>
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