/**
 * @file Implements tests for follow button
 */
import React from "react";
import {HashRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import {FollowList} from "../components/follows";

const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123",followedByMe:false},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234",followedByMe:false},
    {username: 'cathy_brown',password: 'cathy123',email:'cathy@brown.com',_id:'345',followedByMe:false}
]

/**
 * Test renders follow button with static user array
 */
test('renders follow button with static user array', () => {

    render(
        <HashRouter>
            <FollowList users={MOCKED_USERS}/>
        </HashRouter>
    );

    const followButton = screen.getAllByText('Follow',{exact:true});
    expect(followButton.length).toBe(3);

});


