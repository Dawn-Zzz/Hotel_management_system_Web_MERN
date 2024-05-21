import apiBackend from "../utils/apiBackend";

//get List service
export const viewListService = (currentPage) => {
    return apiBackend.get(`/api/service/viewListService/${currentPage}`);
};

//get service by id
export const viewService = (id) => {
    return apiBackend.get(`/api/service/${id}`);
};

//Add new service
export const addNewService = (data) => {
    return apiBackend.post(`/api/service/add`, data);
};
