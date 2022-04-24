/**
 * @file Implements tests for my-media screen
 */
import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";


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

/**
 * Testing multiple images source
 */
describe('multiple images source', () => {
    test('image src', () => {
        render(
            <HashRouter>
                <Tuits tuits={MOCKED_TUITS}/>
            </HashRouter>);

        const displayedImage = screen.getAllByAltText("t-img") ;
        expect(displayedImage[0].src).toContain(img1);
        expect(displayedImage[1].src).toContain(img2);
        expect(displayedImage[2].src).toContain(img3);

    });
});

/**
 * Testing video source
 */
describe('video source', () => {
    test('video src', () => {
        render(
            <HashRouter>
                <Tuits tuits={MOCKED_TUITS}/>
            </HashRouter>);
        const video = screen.getByTitle('YouTube video player');

        expect(video).toHaveAttribute('src', video1);

    });
});

