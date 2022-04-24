import WhoToFollowListItem from "./whoToFollowListItem";
import React, {useEffect, useState} from "react";
import "./whoTofollowList.css"
import {useLocation, useNavigate, useParams} from "react-router-dom";
import * as authService from "../../services/auth-service";
import * as userService from "../../services/users-service";
import * as service from "../../services/auth-service";

const WhoToFollowList = () => {

    const [whos,setWhos] = useState([]);
    const navigate = useNavigate();
    const [currentUser,setCurrentUser] = useState({});

    /**
     * A call back function for find updated users that current user haven't follow.
     * @param uid of the current user
     * @returns {Promise<void>} JSON contains Users' profile or error status
     */
    const findUsers = async (uid) => {
        const newUsers = await userService.findWhoToFollow(uid)
            .then((users) => setWhos(users));
    }
    
    const {pathname} = useLocation();

    useEffect(async () => {
        try {
            let user = await authService.profile();
            setCurrentUser(user);
            await findUsers(user._id);
        } catch (e) {
            navigate('/login');
        }
    }, [pathname]);


    return (
        <div id="tuiter-follow-recommendations"
             className="d-none d-lg-block col-lg-4 col-xl-4 col-xxl-3">
            <div className="followCard bg-secondary bg-opacity-10 ttr-rounded-15px">
                <h5>Who to follow</h5>
                {whos.map && whos.map(who => <WhoToFollowListItem key={who._id} who={who} currentUser={currentUser} refreshUser={findUsers}/>)
                }

                <a href="#">Show more</a>
            </div>
        </div>

    );
}

export default WhoToFollowList;