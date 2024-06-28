import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Chat from "../screens/Chat";

const router = createBrowserRouter([
    {
        path: "/",
        element: App(),
    },
    {
        path: "/chat",
        element: Chat(),
    },
]);