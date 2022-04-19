
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllUsers, findWhoToFollow} from "../services/users-service";
import axios from "axios";
import WhoToFollowList from "../components/whotofollowlist";
import WhoToFollowListItem from "../components/whotofollowlist/whoToFollowListItem";
import React from "react";
import {UserList} from "../components/profile/user-list";

//jest.mock('axios');

const MOCKED_USER =
    {username:'alice',password:'alice123',email: 'alice@wonderland.com', _id: "u123"};




test('who-to-follow list renders static user', () => {

    render(
        <HashRouter>
            <WhoToFollowListItem who={MOCKED_USER}/>
        </HashRouter>);

    const linkElement1 = screen.getByText(/@alice/i);
    const linkElement2 = screen.getByText(/Follow/i);

    expect(linkElement1).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();

});

test('who-to-follow renders async', async () => {
    // TODO: implement this
    const whos = await findWhoToFollow("624772abadd697acd1f87fbf");


    render(
        <HashRouter>
            {
                whos.map && whos.map(who => <WhoToFollowListItem key={who._id} who={who}/>)
            }
        })
        </HashRouter>);

    const linkElement  = screen.getByText(/@alice/i)
    expect(linkElement).toBeInTheDocument();
});

test('follow list renders mocked', async () => {
    const mock = jest.spyOn(axios, 'get');

    mock.mockImplementation(() =>
                                Promise.resolve({ data: {who: MOCKED_USER} }));
    const response = await findWhoToFollow("624772abadd697acd1f87fbf");
    const who = response.who;
    render(
        <HashRouter>
            <WhoToFollowListItem who={who}/>
        </HashRouter>);

    const user = screen.getByText(/@alice/i);
    expect(user).toBeInTheDocument();
});