import apiBackend from "../utils/apiBackend";

//get List service
export const viewListService = (currentPage) => {
  return apiBackend.get(`/api/service/viewListService/${currentPage}`);
};