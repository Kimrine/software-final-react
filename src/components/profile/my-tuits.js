import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits/index";
import {useParams} from "react-router-dom";

const MyTuits = () => {

  const {username} = useParams();

  const [tuits, setTuits] = useState([]);
  const findMyTuits = () =>
      service.findTuitByUser(username)
          .then(tuits => setTuits(tuits));
  useEffect(findMyTuits, []);
  return(
      <Tuits tuits={tuits}
             refreshTuits={findMyTuits}/>
  );
};

export default MyTuits;