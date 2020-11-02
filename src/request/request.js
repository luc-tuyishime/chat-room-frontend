import axios from "axios";
import "dotenv/config";

const { REACT_APP_APIURL } = process.env;
console.log("APIURL", REACT_APP_APIURL);

export const getChatRooms = () => axios.get(`${REACT_APP_APIURL}/chatroom/chatrooms`);

export const getChatRoomMessages = (chatRoomName) =>
    axios.get(`${REACT_APP_APIURL}/chatroom/chatroom/messages/${chatRoomName}`);

export const joinRoom = (room) =>
    axios.post(`${REACT_APP_APIURL}/chatroom/chatroom`, { room });
