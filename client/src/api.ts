import axios from "./axios";

class Api {
  get = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  post = async (url: string, params: any) => {
    try {
      const response = await axios.post(url, params);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
}

export default new Api();
