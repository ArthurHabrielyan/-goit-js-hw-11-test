import "regenerator-runtime/runtime";
import "../src/css/styles.css";
import ImageApiSrvice from "./js/api-service";
import imgCardTpl from "./tamplate/img-card.hbs";
import LoadMoreBtn from "./js/components/load-more-btn";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import getRefs from "./js/get-refs";

const imageApiService = new ImageApiSrvice();
const loadMoreBtn = new LoadMoreBtn({
  selector: ".load-more",
  hidden: true,
});

const refs = getRefs();

refs.searchFormEl.addEventListener("submit", onSearchFormSubmit);
loadMoreBtn.refs.button.addEventListener("click", onFatchData);

function onSearchFormSubmit(event) {
  event.preventDefault();
  const loadData = async () => {
    imageApiService.input =
      event.currentTarget.elements.searchQuery.value.trim();
    event.currentTarget.reset();
    if (!imageApiService.input) {
      clearGalleryContainer();
      return Notify.failure("Please enter a valid string!");
    }

    loadMoreBtn.show();
    console.log("1");
    const dataAcquisition = await imageApiService.fetchImageFromDb();

    if (dataAcquisition.hits.length === 0) {
      imageApiService.resetPage();
      clearGalleryContainer();
      return Notify.failure(
        "Sorry, there are no images matching your search query. Please try again."
      );
    } else {
      imageApiService.resetPage();
      clearGalleryContainer();
      renderImgCard(dataAcquisition);
      loadMoreBtn.enable();
    }
    console.log(dataAcquisition);
  };
  loadData();
}

async function onFatchData(data) {
  loadMoreBtn.disable();
  imageApiService.decrementPage();

  const additionalData = await imageApiService.fetchImageFromDb();
  renderImgCard(additionalData);
  loadMoreBtn.enable();
  if (additionalData.hits.length === 0 || !imageApiService.input) {
    loadMoreBtn.hide();
    imageApiService.resetPage();
    return Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  imageApiService.resetPage();
}

function renderImgCard(data) {
  refs.gallery.insertAdjacentHTML("beforeend", imgCardTpl(data));
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = "";
}

async function fetchImageFromDb() {
  const url = `${BASE_URL}?key=${KEY}&q=${this.inputValue}&lang=en&per_page=40&page=${this.page}&
    image_type="photo&orientation=horizontal&safesearch=true"`;

  try {
    const response = await axios.get(url);
    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
}
