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
 * Put method for user toggling follow to another user
 *
 * @param uid1 the id of user who will follow
 * @param uid2 the id of user who will be followed
 * @returns {Promise<AxiosResponse<any>>}
 */
export const userTogglesUserFollows = (uid1,uid2) =>
    api.put(`${USERS_API}/${uid1}/follows/${uid2}`)
        .then(response=>response.data);

/**
 * Get method for find all users that specific user is following
 * @param username of the specific user
 * @returns {Promise<AxiosResponse<any>>} JSON contains Users' profile or error status
 */
export const findAllUsersFollowing = (username) =>
    api.get(`${USERS_API}/${username}/followings`)
        .then(response=>response.data);

/**
 * Get method for find all users that following the specific user
 * @param username of the specific user
 * @returns {Promise<AxiosResponse<any>>} JSON contains Users' profile or error status
 */
export const findAllUsersFollowers = (username) =>
    api.get(`${USERS_API}/${username}/followers`)
        .then(response=>response.data);