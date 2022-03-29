const axios = require("axios");
const BASE_URL = "https://pixabay.com/api/";
const KEY = "26347249-7bd0a4c88189af5f7d992fd4e";

export default class ImageApiService {
  constructor() {
    this.inputValue = "";
    this.page = 1;
  }

  async fetchImageFromDb() {
    const url = `${BASE_URL}?key=${KEY}&q=${this.inputValue}&per_page=40&page=${this.page}&
    image_type=photo&orientation=horizontal&safesearch=true`;

    try {
      const response = await axios.get(url);
      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);
    }
  }

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
