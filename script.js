const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchContent = document.getElementById("search-content");
const showMoreBtn = document.getElementById("show-more-btn");
let accessKey = `bVuUbciJ0HDfHukGqSzmejsVYVU6k6H3wbNy9MGCFqI`;

let keyword = "nature";
let page = 1;


async function searchImages() {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=15`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchContent.innerHTML = "";
        }

        const results = data.results;

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);
            searchContent.appendChild(imageLink);
        });

        if (data.total_pages > page) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    keyword = searchBox.value;
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});


searchImages();
