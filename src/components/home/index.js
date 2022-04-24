import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Button, Modal} from 'react-bootstrap';

const Home = () => {
    const location = useLocation();
    const {uid} = useParams();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const [videoShow, setVideoShow] = useState(false);
    const handleVdClose = () => setVideoShow(false);
    const handleVdShow = () => setVideoShow(true)

    const [tuits, setTuits] = useState([]);
    const [newTuit, setNewTuit] = useState({tuit: ''});

    const findTuits = () =>
        service.findAllTuits()
            .then(tuits => setTuits(tuits));

    useEffect(() => {
        let isMounted = true;
        findTuits()
        return () => {
            isMounted = false;
        }
    }, []);

    const createNewTuit = (newTuit) => {
        const tuit = {
            ...newTuit,
            image: images,
            stats: {
                replies: 0,
                retuits: 0,
                likes: 0,
                dislikes: 0
            }
        }
        service.createTuit('my', tuit).then(findTuits);
    };

    return (
        <div className="ttr-home">
            <div className="border border-bottom-0">
                <h4 className="fw-bold p-2">Home Screen</h4>
                <div className="d-flex">
                    <div className="p-2">
                        <img className="ttr-width-50px rounded-circle"
                             src="../images/nasa-logo.jpg"/>
                    </div>
                    <div className="p-2 w-100">
                        <textarea className="w-100"
                                  placeholder="What's Happening?"
                                  onChange={(e) =>
                                      setNewTuit({
                                                     ...newTuit,
                                                     tuit: e.target.value
                                                 })}>
                    </textarea>
                        <div className="row">

                            <div className="col-10 ttr-font-size-150pc text-primary">


                                <a href="#" onClick={() => {
                                    handleShow()
                                }}><i className="fas fa-image me-3"></i></a>
                                <Modal show={show} onHide={() => {
                                    handleClose()
                                }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Upload Image</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <input className="w-100"
                                               placeholder="Enter link"
                                               onChange={(e) =>
                                                   setNewTuit({
                                                                  ...newTuit,
                                                                  image: e.target.value
                                                              })}/>
                                        <input type="file" name="myImage"
                                               onChange={(event) => {
                                                   console.log(event.target.files[0]);
                                                   setNewTuit({
                                                       ...newTuit,
                                                       image: URL.createObjectURL(event.target.files[0])
                                                   })
                                               }} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => {
                                            handleClose()
                                        }}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={() => {
                                            handleClose()
                                        }}>
                                            Save
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                <a href="#" onClick={() => {
                                    handleVdShow()
                                }}><i className="fa fa-film me-3"></i></a>
                                <Modal show={videoShow} onHide={() => {
                                    handleVdClose()
                                }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Share Video</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <input className="w-100"
                                               placeholder="Embed video link"
                                               onChange={(e) =>
                                                   setNewTuit({
                                                                  ...newTuit,
                                                                  youtube: e.target.value
                                                              })}/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => {
                                            handleVdClose()
                                        }}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={() => {
                                            handleVdClose()
                                        }}>
                                            Share
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <a href="#"><i className="far fa-gif me-3"></i></a>
                                <a href="#"><i className="far fa-face-smile me-3"></i></a>
                                <a href="#"><i className="far fa-calendar me-3"></i></a>
                                <a href="#"><i className="far fa-map-location me-3"></i></a>
                            </div>
                            <div className="col-2">
                                <a onClick={() =>
                                    createNewTuit(newTuit)}
                                   className={`btn btn-primary rounded-pill fa-pull-right
                                fw-bold ps-4 pe-4`}>
                                    Tuit
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Tuits tuits={tuits}
                   refreshTuits={findTuits}/>
        </div>
    );
};
export default Home;