import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import TuitVideo from "../tuits/tuit-video";
import TuitImage from "../tuits/tuit-image";
import TuitStats from "../tuits/tuit-stats";
import User from "./user";
import * as authService from "../../services/auth-service";

export const FollowList = ({users, refreshUser}) => {

    const {username} = useParams();
    const [currentUser,setCurrentUser] = useState({});

    useEffect(async () => {

        try {
            let user = await authService.profile();
            setCurrentUser(user);

        } catch (e) {

        }
    }, [username]);


    return (
        <div className="list-group">
            {
                users.map(user => <User user={user} currentUser={currentUser} refreshUser={refreshUser}/>)
            }
        </div>
                )



}