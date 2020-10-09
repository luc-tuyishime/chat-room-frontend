import React from "react";
import { Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TopBar from "./components/TopBar";
import { createBrowserHistory as createHistory } from "history";
import "./App.css";
import ChatRoomPage from "./pages/ChatRoomPage";

const history = createHistory();

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <TopBar />
                <Route path="/" exact component={HomePage} />
                <Route path="/chatroom" exact component={ChatRoomPage} />
            </Router>
        </div>
    );
}
export default App;
