import apiBackend from "../utils/apiBackend";

export const viewListRoom = (currentPage) => {
  return apiBackend.get(`/api/room/viewListRoom/${currentPage}`);
};

export const addNewRoom = (data) => {
  return apiBackend.post(`/api/room/add`, data);
};

// export const viewRoomtype = (id) => {
//   return apiBackend.get(`/api/roomtype/${id}`);
// };
