import apiBackend from "../utils/apiBackend";

//Add new booking
export const createNewBooking = (data) => {
    return apiBackend.post(`/api/booking/create`, data);
};

//Add new booking
export const viewListBooking = (currentPage) => {
    return apiBackend.get(`/api/booking/${currentPage}`);
};

//Add new booking
export const viewBooking = (id) => {
    return apiBackend.get(`/api/booking/${currentPage}`);
};
