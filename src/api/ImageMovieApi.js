import axiosClient from "./axiosClient";

const ImageMovieApi = {
  getById(type, id) {
    const url = `/${type}/${id}/images?api_key=9568cdb91fe0c79af33b87e59bb90d25`;
    return axiosClient.get(url);
  },
};

export default ImageMovieApi;
