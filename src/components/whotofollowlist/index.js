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
    const findUsers = async (uid) => {
        await userService.findWhoToFollow(uid)
            .then((users) => setWhos(users));
    }
    
    const {pathname} = useLocation();
    useEffect(async () => {
        try {
            let user = await authService.profile();
            setCurrentUser(user);
            findUsers(user._id)
        } catch (e) {
            navigate('/login');
        }
    }, [pathname,whos]);


    return (
        <div id="tuiter-follow-recommendations"
             className="d-none d-lg-block col-lg-4 col-xl-4 col-xxl-3">
            <div className="followCard bg-secondary bg-opacity-10 ttr-rounded-15px">
                <h5>Who to follow</h5>
                {whos.map && whos.map(who => <WhoToFollowListItem who={who} currentUser={currentUser} refreshUser={findUsers}/>)
                }

                <a href="#">Show more</a>
            </div>
        </div>

    );
}

export default WhoToFollowList;