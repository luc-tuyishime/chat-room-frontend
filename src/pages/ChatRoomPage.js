import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import io from "socket.io-client";
import "./ChatRoomPage.css";
import { getChatRoomMessages, getChatRooms } from "../request/request";

const SOCKET_IO_URL = "http://localhost:7000";
const socket = io(SOCKET_IO_URL);

const getChatData = () => {
    return JSON.parse(localStorage.getItem("chatData"));
};

const schema = yup.object({
    message: yup.string().required("Message is required")
});

function ChatRoomPage() {
    const [initialized, setInitialized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [rooms, setRooms] = useState([]);
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = (dataI) => {
        const getIt = Object.values(dataI);
        const finalValue = getIt?.[0];

        const isValid = schema.validate(dataI);
        if (!isValid) {
            return;
        }
        const data = Object.assign({}, dataI);
        data.chatRoomName = getChatData().chatRoomName;
        data.author = getChatData().handle;
        data.message = dataI.message;
        socket.emit("message", data);
    };

    const handleChange = (e) => {
        setValue("message", e.target.value);
    };

    const connectToRoom = () => {
        socket.on("connect", (data) => {
            socket.emit("join", getChatData().chatRoomName);
        });
        socket.on("newMessage", (data) => {
            getMessages();
        });
        setInitialized(true);
    };

    const getMessages = async () => {
        const response = await getChatRoomMessages(getChatData().chatRoomName);
        setMessages(response.data);
        setInitialized(true);
    };

    const getRooms = async () => {
        const response = await getChatRooms();
        setRooms(response.data);
        setInitialized(true);
    };

    useEffect(() => {
        register("message");
        if (!initialized) {
            getMessages();
            connectToRoom();
            getRooms();
        }
    }, [register]);

    return (
        <div className="chat-room-page">
            <h1>
                Chat Room: {getChatData().chatRoomName}. Chat Handle:{" "}
                {getChatData().handle}
            </h1>
            <div className="chat-box">
                {messages.map((m, i) => {
                    return (
                        <div className="col-12" key={i}>
                            <div className="row">
                                <div className="col-2">{m.author}</div>
                                <div className="col">{m.message}</div>
                                <div className="col-3">
                                    {moment(m.createdAt).format("LLLL")}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter Message"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
export default ChatRoomPage;
