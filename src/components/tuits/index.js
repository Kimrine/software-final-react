import React, {useEffect, useState} from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/like-service";
import * as service from "../../services/tuits-service";
import * as authService from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const Tuits = ({tuits = [], refreshTuits}) => {

    const [profile, setProfile] = useState(undefined);
    const navigate = useNavigate();

    useEffect(async ()=> {
        try {
            const user = await authService.profile();
            if (user) {
                setProfile(user);
            }
        } catch (e) {
        }
    }, []);

    const likeTuit = (tuit) =>{
        if(profile !== undefined){
            likesService.userTogglesTuitLikes("my", tuit._id)
                .then(refreshTuits)
                .catch(e => alert(e));
        }else{
            alert("Please log in!");
            navigate('/login');
        }
    }


    const deleteTuit = (tid) => {
        if(profile !== undefined){
            service.deleteTuit(tid)
                .then(refreshTuits);
        }else{
            alert("Please log in!");
            navigate('/login');
        }
    }


    const dislikeTuit = (tuit) => {
        if(profile!==undefined){
            likesService.userTogglesTuitDislikes("my",tuit._id)
                .then(refreshTuits)
                .catch(e=>alert(e));
        }else{
            alert("Please log in!");
            navigate('/login');
        }


    }


    return (
        <div>
            <ul className="ttr-tuits list-group">
                {
                    tuits.map && tuits.map(tuit =>
                                               <Tuit key={tuit._id}
                                                     deleteTuit={deleteTuit}
                                                     likeTuit={likeTuit}
                                                     dislikeTuit={dislikeTuit}
                                                     tuit={tuit}/>)
                }
            </ul>
        </div>
    );
}

export default Tuits;