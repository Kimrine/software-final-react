import axios from "axios";

const USERS_API = "https://cs5500-01-sp22.herokuapp.com/api/users";

export const findAllUsers = () =>
    axios.get(USERS_API)
        .then(response => response.data);

export const findById = (uid) =>
    axios.get(`${USERS_API}/${uid}`)
        .then(response => response.data);
