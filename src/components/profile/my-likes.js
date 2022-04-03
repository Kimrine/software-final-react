import Tuits from "../tuits";
import * as service from "../../services/like-service";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const MyLikes = () => {
    const {username} = useParams();

    const [likedTuits, setLikedTuis] = useState([]);
    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser(username)
            .then((tuits) => setLikedTuis(tuits));
    useEffect(findTuitsILike, []);

    return(
        <div>
            <Tuits tuits={likedTuits} refreshTuits={findTuitsILike}/>
        </div>
    );
};
export default MyLikes;