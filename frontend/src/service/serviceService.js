import apiBackend from "../utils/apiBackend";

//get List service
export const viewListService = (currentPage) => {
  return apiBackend.get(`/api/service/viewListService/${currentPage}`);
};

//Add new service
export const addNewService = (data) => {
  return apiBackend.post(`/api/service/add`, data);
};
