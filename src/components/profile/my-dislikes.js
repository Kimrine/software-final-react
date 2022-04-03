/**
 * @file Implements the my-dislike screen for display all tuits disliked by a specific user
 */
import Tuits from "../tuits";
import * as service from "../../services/like-service";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

/**
 * Implements the my-dislike screen for display all tuits disliked by a specific user
 * User need to login first before use this page
 * @returns {JSX.Element}
 */

const MyDislikes = () => {

    const {username} = useParams();

    const [dislikedTuits, setDislikedTuis] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser(username)
            .then((tuits) => setDislikedTuis(tuits));
    useEffect(findTuitsIDislike, []);

    return(
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>
        </div>
    );
};

export default MyDislikes;