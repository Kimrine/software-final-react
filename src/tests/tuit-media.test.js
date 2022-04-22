import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

//jest.mock('axios');

const MOCKED_USERS = [
    {username:'alice',password:'alice123',email: 'alice@wonderland.com', _id: "u123"},
    {username:'bob',password:'bob321',email: 'bob@google.com', _id: "u124"},
    {username:'charlie',password:'charlie456',email: 'bob@twitter.com', _id: "u125"}
];

const img1 = "https://assets.mubicdn.net/images/notebook/post_images/17514/images-w1400.jpg?1418357012";
const img2 = "https://alfalfastudio.s3.amazonaws.com/wp-content/uploads/2019/01/02213214/2019_Movie_Poster_Spider_Man_Into_the_Spider_Verse.jpg";
const img3 = "https://cdn.britannica.com/37/191937-050-3B64C5CC/Polar-bear-ice-floes-waters-Arctic-Norway.jpg";
const video1 = "https://www.youtube.com/embed/vdb4XGVTHkE";


const MOCKED_TUITS = [
    {   _id: "t123", tuit: "alice's tuit", postedBy: "u123", image: [img1] },
    {   _id: "t124", tuit: "bob's tuit", postedBy: "u124", image: [img2, img3] },
    {   _id: "t125", tuit: "charlie's tuit", postedBy: "u125", youtube: video1 }
];


describe('multi-images', () => {
    test('image src', () => {
        render(
            <HashRouter>
                <Tuits tuits={MOCKED_TUITS}/>
            </HashRouter>);
        const image1 = screen.getByRole('img');
        const image2 = screen.getByRole('img');
        const image3 = screen.getByRole('img');

        expect(image1).toHaveAttribute('src', img1);
        expect(image2).toHaveAttribute('src', img2);
        expect(image3).toHaveAttribute('src', img3);
    });
});

describe('video', () => {
    test('video src', () => {
        render(
            <HashRouter>
                <Tuits tuits={MOCKED_TUITS}/>
            </HashRouter>);
        const video = screen.getByRole('iframe');

        expect(video).toHaveAttribute('src', video1);

    });
});

