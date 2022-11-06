const LanguageApi = () => {
  const language =
    localStorage.getItem("i18nextLng") === "en" ? "en-US" : "vi-VN" || "en-US";
  return { language };
};

export default LanguageApi;
