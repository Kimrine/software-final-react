/**
 * @file Implements the my-medias screen for display all tuits with media posted by a specific user
 */
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

/**
 * Implements the my-media screen for display all tuits with medias posted by a specific user
 * User need to login first before use this page
 * @returns {JSX.Element}
 */
const MyMedias = () => {

    const {username} = useParams();
    const [mediaTuits, setMediaTuis] = useState([]);
    const findMediasIHave = () =>
        service.findAllTuitsHaveMediasByUser(username)
            .then((tuits) => setMediaTuis(tuits));
    useEffect(findMediasIHave, []);

    return(
        <div>
            <Tuits tuits={mediaTuits}
                   refreshTuits={findMediasIHave}/>
        </div>
    );
};
export default MyMedias;

