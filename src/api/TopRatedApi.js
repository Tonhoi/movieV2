import LanguageApi from "../hooks/LanguageApi";
import axiosClient from "./axiosClient";

const TopRatedApi = {
  getByPage: (currentPage = 1) => {
    const { language } = LanguageApi();

    const url = `/movie/top_rated?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=${language}&page=${currentPage}`;
    return axiosClient.get(url);
  },
};

export default TopRatedApi;
