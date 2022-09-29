import axios from "./axios";

class Api {
  get = async (url: string) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken") || "",
      },
    });
    return response.data;
  };

  post = async (url: string, params: any) => {
    const response = await axios.post(url, params, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken") || "",
      },
    });
    return response.data;
  };
}

export default new Api();
