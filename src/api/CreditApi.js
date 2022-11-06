import axiosClient from "./axiosClient";

const CreditApi = {
  getById(type, id) {
    const url = `/${type}/${id}/credits?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US`;
    return axiosClient.get(url);
  },
};

export default CreditApi;
