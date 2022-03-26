import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
                             withCredentials: true
                         });

export const userLikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const userTogglesTuitLikes = (uid,tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response=>response.data);

export const userTogglesTuitDislikes = (uid,tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response=>response.data);