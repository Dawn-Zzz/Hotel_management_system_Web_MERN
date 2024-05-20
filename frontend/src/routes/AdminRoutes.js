import AddGuest from "../admin/pages/guest/AddGuest";
import EditGuest from "../admin/pages/guest/EditGuest";
import Guest from "../admin/pages/guest/Guest";
import GuestDetail from "../admin/pages/guest/GuestDetail";
import AdminHome from "../admin/pages/home/AdminnHome";
import Invoice from "../admin/pages/invoice/Invoice";
import AdminLogin from "../admin/pages/login/AdminLogin";
import AddRegistration from "../admin/pages/registration/AddRegistration";
import Registration from "../admin/pages/registration/Registration";
import AddRoomType from "../admin/pages/room/roomType/AddRoomType";
import EditRoomType from "../admin/pages/room/roomType/EditRoomType";
import RoomType from "../admin/pages/room/roomType/RoomType";
import RoomTypeDetail from "../admin/pages/room/roomType/RoomTypeDetail";
import AddRoom from "../admin/pages/room/rooms/AddRoom";
import RoomDetail from "../admin/pages/room/rooms/RoomDetail";
import Rooms from "../admin/pages/room/rooms/Rooms";
import AddService from "../admin/pages/service/AddService";
import Service from "../admin/pages/service/Service";
import AddStaff from "../admin/pages/staff/AddStaff";
import EditStaff from "../admin/pages/staff/EditStaff";
import Staff from "../admin/pages/staff/Staff";
import StaffDetail from "../admin/pages/staff/StaffDetail";

const publicAdminRoutes = [
    { path: "/admin", component: AdminHome },
    //Guest
    { path: "/admin/guest", component: Guest },
    { path: "/admin/guest/:id", component: GuestDetail },
    { path: "/admin/guest/add", component: AddGuest },
    { path: "/admin/guest/edit/:id", component: EditGuest },
    //Room
    { path: "/admin/rooms", component: Rooms },
    { path: "/admin/rooms/:id", component: RoomDetail },
    { path: "/admin/rooms/add", component: AddRoom },
    //RoomType
    { path: "/admin/roomtype", component: RoomType },
    { path: "/admin/roomtype/:id", component: RoomTypeDetail },
    { path: "/admin/roomtype/add", component: AddRoomType },
    { path: "/admin/roomtype/edit/:id", component: EditRoomType },
    //Staff
    { path: "/admin/staff", component: Staff },
    { path: "/admin/staff/:id", component: StaffDetail },
    { path: "/admin/staff/edit/:id", component: EditStaff },
    { path: "/admin/addstaff", component: AddStaff },
    //Invoice
    { path: "/admin/invoice", component: Invoice },
    //Service
    { path: "/admin/service", component: Service },
    { path: "/admin/addservice", component: AddService },
    //Registration
    { path: "/admin/registration", component: Registration },
    { path: "/admin/addregistration", component: AddRegistration },
    //Auth
    { path: "/admin/login", component: AdminLogin, layout: null },
];

const privateAdminRoute = [];

export { publicAdminRoutes, privateAdminRoute };
