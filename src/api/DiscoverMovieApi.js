import LanguageApi from "../hooks/LanguageApi";
import axiosClient from "./axiosClient";

const DiscoverMovieApi = {
  getByPage: (currentPage = 1) => {
    const { language } = LanguageApi();
    const url = `/discover/movie?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=${language}&sort_by=popularity.desc&page=${currentPage}&release_date.gte=&release_date.lte=&vote_average.gte=&vote_average.lte=&with_genres=&with_original_language=`;
    return axiosClient.get(url);
  },
};

export default DiscoverMovieApi;
