import apiBackend from "../utils/apiBackend";

//Add new booking
export const createNewBooking = (data) => {
  return apiBackend.post(`/api/booking/create`, data);
};

//Edit booking
export const editBooking = (id, roomInteraction, serviceBookings) => {
  return apiBackend.put(`/api/booking/edit/${id}`, {
    roomInteraction,
    serviceBookings,
  });
};

//View list free room
export const viewListFreeRoom = (checkin, checkout) => {
  return apiBackend.get(`/api/booking/viewListFreeRoom/${checkin}/${checkout}`);
};

export const viewListBooking = (currentPage) => {
  return apiBackend.get(`/api/booking/${currentPage}`);
};

export const viewBooking = (id) => {
  return apiBackend.get(`/api/booking/view/${id}`);
};
