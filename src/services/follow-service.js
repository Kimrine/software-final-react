/**
 * @file Implements the follow service
 */

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

export const api = axios.create({
                                    withCredentials: true
                                });
/**
 * User toggling follow to another user
 *
 * @param uid1 the id of user who will follow
 * @param uid2 the id of user who will be followed
 * @returns {Promise<AxiosResponse<any>>}
 */
export const userTogglesUserFollows = (uid1,uid2) =>
    api.put(`${USERS_API}/${uid1}/follows/${uid2}`)
        .then(response=>response.data);

export const findAllUsersFollowing = (username) =>
    api.get(`${USERS_API}/${username}/followings`)
        .then(response=>response.data);

export const findAllUsersFollowers = (username) =>
    api.get(`${USERS_API}/${username}/followers`)
        .then(response=>response.data);