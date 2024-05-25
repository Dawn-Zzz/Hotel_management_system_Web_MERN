import apiBackend from "../utils/apiBackend";

//Add new booking
export const createNewBooking = (data) => {
  return apiBackend.post(`/api/booking/create`, data);
};
