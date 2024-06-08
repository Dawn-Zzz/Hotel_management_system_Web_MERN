import apiBackend from "../utils/apiBackend";

export const viewListBill = (currentPage) => {
    return apiBackend.get(`/api/bill/viewListBill/${currentPage}`);
};

export const viewBillDetail = (id) => {
    return apiBackend.get(`/api/bill/detail/${id}`);
};