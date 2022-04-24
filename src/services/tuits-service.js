/**
 * @file Implements the tuit service
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;

export const api = axios.create({
                             withCredentials: true
                         });

/**
 * Find all of the tuits
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findAllTuits = () =>
    api.get(TUITS_API)
        .then(response => response.data);

/**
 * Find the tuits of the user who is followed by the current user
 *
 * @param uid the id of the user who is followed
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findTuitsByFollow = (uid) =>
    api.get(`${TUITS_API}/${uid}/followTuits`)
        .then(response => response.data);

/**
 * Find the tuit with tid
 *
 * @param tid the id of tuit
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findTuitById = (tid) =>
    api.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

/**
 * Find all tuits posted by a certain user
 *
 * @param uid the id of user
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findTuitByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

/**
 * Create a new tuit posted by a certain user
 *
 * @param uid the id of user
 * @param tuit the content of this tuit
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createTuit = (uid, tuit) =>
    api.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);


/**
 * Update the certain tuit with the id of tid
 *
 * @param tid the id of tuit
 * @param tuit the content of this uodate
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateTuit = (tid, tuit) =>
    api.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

/**
 * Delete the certain tuit with the id of tid
 *
 * @param tid the id of tuit
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteTuit = (tid) =>
    api.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

/**
 * Find all tuits with media posted by a user
 *
 * @param uid the id of user
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findAllTuitsHaveMediasByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/media`)
        .then(response => response.data);

