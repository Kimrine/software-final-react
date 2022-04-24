/**
 * @file Implements tests for edit-profile screen
 */
import React from "react";
import EditProfile from "../components/profile/edit-profile";
import {api, profile} from "../services/auth-service";
import {render, screen, waitFor} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import bob from "./bobInfo.json"
import * as authService from "../services/auth-service";

const MOCKED_USER = bob;
/**
 * Testing renders user's profile information in edit-profile pages
 */
test('profile information in edit-profile pages renders mocked', async () => {

    const mock = jest.spyOn(api, 'get');

    mock.mockImplementation(() =>
                                Promise.resolve({data: MOCKED_USER}));

    render(
        <HashRouter>
            <EditProfile/>
        </HashRouter>
    )

    await waitFor(() => {
        for (const key in MOCKED_USER) {
            if (key === "_id") {
                return;
            }
            const profileAttribute = MOCKED_USER[key];
            const profileElement = screen.getByDisplayValue(profileAttribute);
            expect(profileElement).toBeInTheDocument();
        }
    })



});