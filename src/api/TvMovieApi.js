import LanguageApi from "../hooks/LanguageApi";
import axiosClient from "./axiosClient";

const TvMovieApi = {
  getByPage(params) {
    const { language } = LanguageApi();
    const [page = 1, sort] = params;
    const url = `/discover/tv?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=${language}&sort_by=popularity.desc&page=${page}${sort}`;
    return axiosClient.get(url);
  },
};

export default TvMovieApi;
