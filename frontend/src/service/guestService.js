import apiBackend from "../utils/apiBackend";

//get List guest
export const viewListGuest = (currentPage) => {
  return apiBackend.get(`/api/guest/viewListGuest/${currentPage}`);
};