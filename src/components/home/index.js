import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Button, Modal} from 'react-bootstrap';
import "./home.css"
import Carousel from 'react-bootstrap/Carousel'

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
    const [images, setImages] = useState([]);
    const [fileUrl, setFileUrl] = useState([]);

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

    const imageData = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const img = await imageData(file)
        // const imageUrl = URL.createObjectURL(file);
        // setFileUrl((arr) => [...arr, imageUrl]);
        setImages((arr) =>
            [...arr, img]
        )}

    const getPreview = async (event) => {
        const file = event.target.value
        setFileUrl((arr) => [...arr, file]);

        const url = event.target.value;
        setImages((arr) =>
            [...arr, url]
        )
    }
    const deleteImage = (file) => {
        const newFiles = images.filter(f => f !== file);
        setImages(newFiles);
        //alert("The image is deleted")
    }

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
                        {
                            images.length > 0 &&
                            images.map((image, nth) =>
                                 <span key={nth} className={"badge bg-secondary me-3 position-relative"}>
                                     {image.name}
                                    <img src={image} className=" tt-images mt-2 w-100 ttr-rounded-15px" width={10} height={10}/>
                                    <span
                                        className={"position-absolute top-0 start-100 badge rounded-pill bg-dark"}
                                        onClick={() => deleteImage(image)}>
                                        <i className={"fa-solid fa-xmark"}/>
                                    </span>
                                 </span> )
                            }
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
                                               onChange={e => getPreview(e)}/>
                                        <input type="file" name="myImage" accept="image/gif,image/jpeg,image/jpg,image/png" multiple
                                               onChange={e => handleFileRead(e)}/>
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