import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";

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

