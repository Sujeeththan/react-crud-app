import axios from "axios";

const API_URL = "https://express-mongo-connection-sigma.vercel.app/api/users"

// GET USERS
export const getUsers = async () => {
    const res = await axios.get(API_URL);
    return res.data.users;
};

// GET USER BY ID
export const getUserById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data.user;
};

// CREATE USER
export const createUser = async (userData) => {
    const res = await axios.post(API_URL, userData);
    return res.data.user;
};

// UPDATE USER
export const updateUser = async (id, userData) => {
    const res = await axios.put(`${API_URL}/${id}`, userData);
    return res.data.user;
};

// DELETE USER
export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};