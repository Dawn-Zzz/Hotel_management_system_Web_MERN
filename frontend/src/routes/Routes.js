import About from "../pages/about/About";
import Home from "../pages/home/Home";
import Room from "../pages/room/Room";
import Service from "../pages/service/Service";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/room", component: Room },
    { path: "/about", component: About },
    { path: "/service", component: Service },
];

const privateRoute = [];

export { publicRoutes, privateRoute };
