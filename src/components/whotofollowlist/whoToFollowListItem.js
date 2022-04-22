import React from "react";
import "./whoTofollowList.css"
import * as followService from "../../services/follow-service";
import {Link} from "react-router-dom";

const WhoToFollowListItem = ({who,currentUser,refreshUser}) => {

    const followUser = async () => {
        console.log(currentUser+":"+who);
        console.log(currentUser.username+":"+who.username);
        await followService.userTogglesUserFollows(currentUser._id, who._id)
            .then(()=> refreshUser(currentUser._id))
            .catch(e => alert(e));
    }


    return(
        <div className="tuiter-follow-recommendation-item">
            <div className="profile-summary">
                <img src={`${who.profilePhoto}`}/>
                <div>
                    <div>
                        <Link to={`/profile/${who.username}`} className="text-decoration-none">
                            <b>{who.username} </b>
                        </Link>
                        <span className="fa-stack" style={{"fontSize": "0.5em"}}>
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fas fa-check fa-stack-1x fa-inverse"></i>
                        </span></div>

                    <div>@{who.username}</div>
                </div>
            </div>
            <button onClick={followUser} className="btn">Follow</button>
        </div>
    );

}

export default WhoToFollowListItem;