/**
 * @file Implements the my-medias screen for display all tuits with media posted by a specific user
 */
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";

/**
 * Implements the my-media screen for display all tuits with medias posted by a specific user
 * User need to login first before use this page
 * @returns {JSX.Element}
 */
const MyMedias = () => {
    const [mediaTuits, setMediaTuis] = useState([]);
    const findMediasIHave = () =>
        service.findAllTuitsHaveMediasByUser("me")
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

