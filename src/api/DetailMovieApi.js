import LanguageApi from "../hooks/LanguageApi";
import axiosClient from "./axiosClient";

const DetailMovieApi = {
  getById(type, id) {
    const { language } = LanguageApi();

    const url = `/${type}/${id}?api_key=9568cdb91fe0c79af33b87e59bb90d25&append_to_response=videos&language=${language}`;
    return axiosClient.get(url);
  },
};

export default DetailMovieApi;
