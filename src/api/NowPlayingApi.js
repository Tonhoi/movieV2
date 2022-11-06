import LanguageApi from "../hooks/LanguageApi";
import axiosClient from "./axiosClient";

const NowPlayingApi = {
  getByPage(currentPage) {
    const { language } = LanguageApi();
    const url = `/movie/now_playing?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=${language}&${currentPage}`;
    return axiosClient.get(url);
  },
};

export default NowPlayingApi;
