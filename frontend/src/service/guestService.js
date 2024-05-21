import apiBackend from "../utils/apiBackend";

//get List guest
export const viewListGuest = (currentPage) => {
    return apiBackend.get(`/api/guest/viewListGuest/${currentPage}`);
};

//get guest by id
export const viewGuest = (id) => {
    return apiBackend.get(`/api/guest/${id}`);
};

//Add new guest
export const addNewGuest = (data) => {
  return apiBackend.post(`/api/guest/add`, data);
};

//Edit guest
export const editGuest = (id,data) => {
  return apiBackend.post(`/api/guest/edit/${id}`, data);
};