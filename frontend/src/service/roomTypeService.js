import apiBackend from "../utils/apiBackend";

//get List service
export const viewListRoomType = (currentPage) => {
  return apiBackend.get(`/api/roomtype/viewListRoomType/${currentPage}`);
};

//Add new staff
export const addNewRoomType = (data) => {
  return apiBackend.post(`/api/roomtype/add`, data);
};
