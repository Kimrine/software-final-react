import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";

const TuitImage = ({tuit}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    return (
        <div className="position-relative">

            <a onClick={() => {
                handleShow()
            }}><img src={`${tuit.image}`}
                    className="mt-2 w-100 ttr-rounded-15px"/></a>
            <Modal size="lg" show={show} onHide={() => {
                handleClose()
            }}>
                <Modal.Body>
                    <img src={`${tuit.image}`}
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
            {/*{*/}
            {/*  tuit.imageOverlay &&*/}
            {/*  <span*/}
            {/*    className={`fa-2x text-white fw-bold bottom-0*/}
            {/*                ttr-tuit-image-overlay position-absolute`}>*/}
            {/*    {tuit.imageOverlay}*/}
            {/*  </span>*/}
            {/*}*/}
        </div>
    );
};
export default TuitImage;