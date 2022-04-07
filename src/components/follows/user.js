import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import * as authService from "../../services/auth-service";
import * as followService from "../../services/follow-service";

const User = ({user,currentUser,refreshUser}) => {
    
    const followUser = async () => {

        followService.userTogglesUserFollows(currentUser._id, user._id)
            .then(refreshUser)
            .catch(e => alert(e));
    }

    let follow="Follow";
    let unfollow="Unfollow";
    return(

        <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
            <div className="pe-2">
                {
                    <img src={`../images/${user.username}.jpg`}
                         className="ttr-tuit-avatar-logo rounded-circle" width="50px" height="50px"/>
                }
            </div>
            <div className="w-100">
                <h2
                    className="fs-5">
                    <Link to={`/profile/${user.username}`} className="text-decoration-none" >
                        <b>{user && user.username}</b>
                    </Link>
                </h2>
                @{user && user.username}
            </div>
            <div className="pe-2">
                {   currentUser.username!==user.username&&
                    <button onClick={followUser} className="mt-2 me-3 float-end btn btn-primary rounded-pill ">
                        {
                            user.followedByMe && unfollow
                        }
                        {
                            user.followedByMe===false && follow
                        }
                    </button>
                }

            </div>
        </li>
    );
}
export default User;