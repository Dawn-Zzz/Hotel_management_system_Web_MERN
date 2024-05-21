import apiBackend from "../utils/apiBackend";

//get List service
export const viewListRoomType = (currentPage) => {
    return apiBackend.get(`/api/roomtype/viewListRoomType/${currentPage}`);
};

//Add new staff
export const addNewRoomType = (data) => {
    return apiBackend.post(`/api/roomtype/add`, data);
};
//get roomtype by id
export const viewRoomtype = (id) => {
    return apiBackend.get(`/api/roomtype/${id}`);
};
