import axiosClient from "./axiosClient";

const ReviewMovieApi = {
  getById(type, id) {
    const url = `/${type}/${id}/reviews?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&page=1`;
    return axiosClient.get(url);
  },
};

export default ReviewMovieApi;
