const axios = require("axios");
const BASE_URL = "https://pixabay.com";
const KEY = "26347249-7bd0a4c88189af5f7d992fd4e";
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export default class ImageApiService {
  constructor() {
    this.inputValue = "";
    this.page = 1;
  }

  fetchImageFromDb = async () => {
    try {
      const response = await instance.get("/api");
      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // async fetchImageFromDb() {
  // const url = `${BASE_URL}?key=${KEY}&q=${this.inputValue}&per_page=40&page=${this.page}&
  // image_type=photo&orientation=horizontal&safesearch=true`;

  decrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get input() {
    return this.inputValue;
  }

  set input(newInput) {
    this.inputValue = newInput;
  }
}
