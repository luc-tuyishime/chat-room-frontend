const axios = require("axios");
const APIURL = "http://localhost:7000";

export const getChatRooms = () => axios.get(`${APIURL}/chatroom/chatrooms`);

export const getChatRoomMessages = (chatRoomName) =>
    axios.get(`${APIURL}/chatroom/chatroom/messages/${chatRoomName}`);

export const joinRoom = (room) => axios.post(`${APIURL}/chatroom/chatroom`, { room });
