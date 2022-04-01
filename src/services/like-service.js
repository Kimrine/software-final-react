/**
 * @file Implements the like and dislikes service
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
                             withCredentials: true
                         });

/**
 * User toggling likes to a tuit
 *
 * @param uid the id of user
 * @param tid the id of tuit
 * @returns {Promise<AxiosResponse<any>>}
 */
export const userTogglesTuitLikes = (uid,tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response=>response.data);

/**
 * User toggling dislikes to a tuit
 *
 * @param uid the id of user
 * @param tid the id of tuit
 * @returns {Promise<AxiosResponse<any>>}
 */
export const userTogglesTuitDislikes = (uid,tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response=>response.data);

/**
 * Find all tuits liked by a user
 *
 * @param uid the id of user
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findAllTuitsLikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/likes`)
        .then(response => response.data);

/**
 * Find all tuits disliked by a user
 *
 * @param uid the id of user
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findAllTuitsDislikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/dislikes`)
        .then(response => response.data);