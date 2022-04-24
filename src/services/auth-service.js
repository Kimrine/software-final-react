/**
 * @file Implements the authn service
 */
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AUTH_API = `${BASE_URL}/api/auth`;

export const api = axios.create({
                             withCredentials:true
                         });

/**
 * POST method for sign up a new account
 * @param user user information to sign up
 * @returns {Promise<AxiosResponse<any>>} JSON contains User's profile or error status
 */
export const signup = (user) =>
    api.post(`${AUTH_API}/signup`,user)
        .then(response => response.data);

/**
 * POST method for login
 * @param credentials username and password for login
 * @returns {Promise<AxiosResponse<any>>} JSON contains User's profile or error status
 */
export const login = (credentials) =>
    api.post(`${AUTH_API}/login`,credentials)
        .then(response => response.data);

/**
 * POST method for get the current user profile which stored in session
 * @returns {Promise<AxiosResponse<any>>} JSON contains User's profile or error status
 */
export const profile = () =>
        api.post(`${AUTH_API}/profile`)
            .then(response => response.data);

/**
 * POST method for log out
 * @param user the user who will log out
 * @returns {Promise<AxiosResponse<any>>} Status whether user is logout
 */
export const logout = (user) =>
    api.post(`${AUTH_API}/logout`,user)
        .then(response => response.data);

/**
 * Get method for find user by username
 * @param username of user
 * @returns {Promise<AxiosResponse<any>>} JSON contains User's profile or error status
 */
export const findUser = (username) =>
    api.get(`${BASE_URL}/api/users/username/${username}`)
        .then(response=>response.data);

/**
 * Put method for update user information
 * @param user the information of user which will update
 * @returns {Promise<AxiosResponse<any>>} JSON contains User's profile or error status
 */
export const update = (user) =>
    api.put(`${BASE_URL}/api/users/${user._id}`,user)
    .then(response=>response.data);