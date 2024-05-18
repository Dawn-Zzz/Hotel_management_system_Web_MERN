import apiBackend from "../utils/apiBackend";

//get List staff
export const viewListStaff = (currentPage) => {
  return apiBackend.get(`/api/staff/viewListStaff/${currentPage}`);
};

//Add new staff
export const addNewStaff = (data) => {
  return apiBackend.post(`/api/staff/add`, data);
};
