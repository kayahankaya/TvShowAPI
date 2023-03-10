const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm } };
  try {
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);
  } catch (error) {
    console.log(error);
    const results = form.querySelector("#results");
    results.innerHTML = "An error occurred while fetching data.";
  } finally {
    form.elements.query.value = "";
  }
});

const makeImages = async (shows) => {
  const results = form.querySelector("#results");
  results.innerHTML = "";
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  results.appendChild(spinner);
  try {
    for (let result of shows) {
      if (result.show.image) {
        const img = document.createElement("IMG");
        img.src = result.show.image.medium;
        results.append(img);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    spinner.remove();
  }
};