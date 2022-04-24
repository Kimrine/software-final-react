/**
 * @file Implements tests for my-media screen
 */
import MyMedias from "../components/profile/my-medias";
import {render, screen, waitFor} from "@testing-library/react";
import {api} from "../services/tuits-service";
import React from "react";
import {HashRouter} from "react-router-dom";

const MOCKED_TUITS = [
    {
        _id: "6213c0b08a4248e9e09e1ft1",
        tuit: "test dislike tuit 1 alice",
        postedBy: {
            _id: "6213c0b08a4248e9e09e1fu1",
            username: "alice",
            password: "alice",
            email: "alice@google.com"
        },
        stats: {dislikes: 2},
        image: "www.image.com",
        youtube: null,
    },
    {
        _id: "6213c0b08a4248e9e09e1ft2",
        tuit: "test dislike tuit 2 alice",
        postedBy: {
            _id: "6213c0b08a4248e9e09e1fu2",
            username: "alice",
            password: "alice",
            email: "alice@google.com"
        },
        stats: {dislikes: 56},
        image: null,
        youtube: null,
    },
    {
        _id: "6213c0b08a4248e9e09e1ft3",
        tuit: "test dislike tuit 1 bob",
        postedBy: {
            _id: "6213c0b08a4248e9e09e1fu3",
            username: "bob",
            password: "bob",
            email: "bob@google.com"
        },
        stats: {dislikes: 123},
        image: null,
        youtube: "www.youtube.com",
    }
];

/**
 * Testing my media screen renders mocked
 */
describe('my media screen renders mocked ', () => {
    const mock = jest.spyOn(api, 'get');

    afterEach(()=> {
        mock.mockRestore();
    })

    test('my media screen renders mocked', async () => {
        // TODO: implement this

        mock.mockImplementation(() =>
            Promise.resolve({data: MOCKED_TUITS}));

        render(
            <HashRouter>
                <MyMedias />
            </HashRouter>

        );

        await waitFor(() => {
            MOCKED_TUITS.map(tuit => {
                let username = tuit.postedBy.username;
                const image = tuit.image;
                const video = tuit.youtube;


                const nameEle = screen.getAllByText(username, {exact: false});
                const tuitEle = screen.getAllByText(tuit.tuit, {exact: false});
                nameEle.forEach(e => expect(e).toBeInTheDocument());
                tuitEle.forEach(e => expect(e).toBeInTheDocument());

                expect(video !== null || image !== null)
            })
        })
    });
});