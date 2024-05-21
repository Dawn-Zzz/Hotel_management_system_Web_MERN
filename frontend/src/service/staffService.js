import apiBackend from "../utils/apiBackend";

//get List staff
export const viewListStaff = (currentPage) => {
    return apiBackend.get(`/api/staff/viewListStaff/${currentPage}`);
};

//get staff by id
export const viewStaff = (id) => {
    return apiBackend.get(`/api/staff/${id}`);
};

//Add new staff
export const addNewStaff = (data) => {
    return apiBackend.post(`/api/staff/add`, data);
};

//Edit staff
export const editStaff = (id,data) => {
    return apiBackend.post(`/api/staff/edit/${id}`, data);
  };
