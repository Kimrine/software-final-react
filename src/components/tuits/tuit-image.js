/**
 * @file TuitImage component for display image(s) of a tuit
\ */
import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'

export const TuitImage = ({images = []}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [img, setImg] = useState();
    const handleShow = () => setShow(true);
//className=" position-relative"
    return (

        <div className="h-100">
            <Carousel>

                {images.map && images.map(image =>
                                              <Carousel.Item key={image}>
                                                  <a onClick={() => {
                                                      setImg(image)
                                                      handleShow()
                                                  }}><img src={image}
                                                          className=" tt-images mt-2 w-100 ttr-rounded-15px" alt={"t-img"}/></a>
                                                  </Carousel.Item>)}
                </Carousel>
            <Modal size="lg" show={show} onHide={() => {
                handleClose()
            }}>
                <Modal.Body>
                    <img src={img}
                         className="w-100"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};

export const SingleTuitImage = ({image}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
//className=" position-relative"
    return (

        <div className="position-relative">

            <a onClick={() => {
                handleShow()
            }}><img src={image}
                    className=" mt-2 w-100 ttr-rounded-15px" alt={"t-img"}/></a>

            <Modal size="lg" show={show} onHide={() => {
                handleClose()
            }}>
                <Modal.Body>
                    <img src={image}
                         className="w-100"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};
