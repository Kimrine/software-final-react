/**
 * @file Implements tests for dislikes button
 */
import {render, screen} from "@testing-library/react";
import React from "react";
import Tuit from "../components/tuits/tuit";
import {HashRouter} from "react-router-dom";

const MOCKED_TUIT =
    {
        _id: "6213c0b08a4248e9e09e1ft1",
        tuit: "test dislike tuit 1 alice",
        postedBy: {
            _id: "6213c0b08a4248e9e09e1fu1",
            username: "alice",
            password: "alice",
            email: "alice@google.com"
        },
        stats: {dislikes: 998},
    };

/**
 * Test the dislike button display successfully
 */
describe("render dislikes-button with static tuit", () => {render(
    <HashRouter>
        <Tuit tuit={MOCKED_TUIT}/>
    </HashRouter>);

    test("render dislikes-button with static tuit", () => {

        const linkElement1 = screen.getByText('998',{exact:true});
        expect(linkElement1).toBeInTheDocument();
    })
})


