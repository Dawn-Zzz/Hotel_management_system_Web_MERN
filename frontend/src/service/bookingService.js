import apiBackend from "../utils/apiBackend";

//Add new booking
export const createNewBooking = (data) => {
    return apiBackend.post(`/api/booking/create`, data);
};

//View list free room
export const viewListFreeRoom = (checkin, checkout) => {
    return apiBackend.get(
        `/api/booking/viewListFreeRoom/${checkin}/${checkout}`
    );
};

//Add new booking
export const viewListBooking = (currentPage) => {
    return apiBackend.get(`/api/booking/${currentPage}`);
};

//Add new booking
export const viewBooking = (id) => {
    return apiBackend.get(`/api/booking/view/${id}`);
};
