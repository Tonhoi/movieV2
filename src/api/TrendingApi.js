import axiosClient from "./axiosClient";

const TrendingApi = {
  getAll() {
    const url = "/trending/all/day?api_key=9568cdb91fe0c79af33b87e59bb90d25";
    return axiosClient.get(url);
  },
};

export default TrendingApi;
