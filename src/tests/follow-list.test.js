import {FollowList} from "../components/follows/index"
import {screen, render, waitFor} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllUsersFollowers, findAllUsersFollowing} from "../services/follow-service";
import axios from "axios";
import {api} from "../services/like-service";
import MyDislikes from "../components/profile/my-dislikes";
import React from "react";
import {UserList} from "../components/profile/user-list";
import Following from "../components/profile/following";

//jest.mock('axios');

const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com',followedByMe:true},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com',followedByMe:true},
]

test('follow list renders static user array', () => {
    render(
        <HashRouter>
            <FollowList users={MOCKED_USERS}/>
        </HashRouter>);
    const linkElement1 = screen.getByText(/@ellen_ripley/i);
    const linkElement2 = screen.getByText(/@sarah_conor/i);
    expect(linkElement1).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
});

test('user list renders async', async () => {
    const users = await findAllUsers();

    render(
        <HashRouter>
            <UserList users={users}/>
        </HashRouter>);
    const linkElement = screen.getByText(/alice/i);
    expect(linkElement).toBeInTheDocument();
})


test('user list renders mocked', async () => {
    const mock = jest.spyOn(axios, 'get');

    mock.mockImplementation(() =>
                                Promise.resolve({ data:MOCKED_USERS }));

    render(
        <HashRouter>
            <Following />
        </HashRouter>);

    const user = screen.getByText(/@ellen_ripley/i);
    expect(user).toBeInTheDocument();
});

/**
 * Testing following screen renders mocked
 */
describe('my following screen renders mocked ', () => {
    const mock = jest.spyOn(api, 'get');

    afterEach(()=> {
        mock.mockRestore();
    })

    test('my following screen renders mocked', async () => {
        // TODO: implement this

        mock.mockImplementation(() =>
                                    Promise.resolve({data: MOCKED_USERS}));

        render(
            <HashRouter>
                <MyDislikes />
            </HashRouter>

        );

        await waitFor(() => {
            MOCKED_TUITS.map(tuit => {
                let username = tuit.postedBy.username;
                const dislikesCount = tuit.stats.dislikes;

                const nameEle = screen.getAllByText(username, {exact: false});
                const tuitEle = screen.getAllByText(tuit.tuit, {exact: false});

                nameEle.forEach(e => expect(e).toBeInTheDocument());
                tuitEle.forEach(e => expect(e).toBeInTheDocument());

                expect(screen.getByText(dislikesCount)).toBeInTheDocument();

            })
        })
    });
});