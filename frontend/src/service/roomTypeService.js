import apiBackend from "../utils/apiBackend";

//get List service
export const viewListRoomType = (currentPage) => {
  return apiBackend.get(`/api/roomtype/viewListRoomType/${currentPage}`);
};