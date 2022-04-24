/**
 * @file test for follow list
 */
import {FollowList} from "../components/follows/index"
import {screen, render, waitFor} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllUsersFollowing} from "../services/follow-service";
import {api} from "../services/follow-service";
import React from "react";

const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com',followedByMe:true},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com',followedByMe:true},
]

/**
 * Testing follow list could renders static user array
 */
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

/**
 * Testing following user list could renders async
 */
test('follow user list renders async', async () => {
    const users = await findAllUsersFollowing("kk");
    render(
        <HashRouter>
            <FollowList users={users}/>
        </HashRouter>);
    const linkElement = screen.getByText(/@alice/i);
    expect(linkElement).toBeInTheDocument();
})

/**
 * Testing following screen renders mocked
 */
test('my following screen renders mocked', async () => {

        const mock = jest.spyOn(api, 'get');

        mock.mockImplementation(() =>
                                    Promise.resolve({data: MOCKED_USERS}));

        const users = await findAllUsersFollowing("kk");


        render(
            <HashRouter>
                <FollowList users={users} />
            </HashRouter>
        );

        await waitFor(() => {
            MOCKED_USERS.map(user => {
                let username = user.username;

                const nameEle = screen.getAllByText("@"+username, {exact: false});
                nameEle.forEach(e => expect(e).toBeInTheDocument());

            })
        })
});