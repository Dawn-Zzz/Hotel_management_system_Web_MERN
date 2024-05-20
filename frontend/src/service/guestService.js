import apiBackend from "../utils/apiBackend";

//get List guest
export const viewListGuest = (currentPage) => {
    return apiBackend.get(`/api/guest/viewListGuest/${currentPage}`);
};

//get guest by id
export const viewGuest = (id) => {
    return apiBackend.get(`/api/guest/${id}`);
};
