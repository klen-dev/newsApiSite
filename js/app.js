const popularBlogContainer = document.querySelector(".popular-blog-container")
const businessBtn = document.querySelector("#Business")
const startUpBtn = document.querySelector("#Startup")
const economyBtn = document.querySelector("#Economy")
const technologyBtn = document.querySelector("#Technology")
const popularBlog = document.querySelector("#Popular-blog")

const newsApiKey = '43d9e280e2a74a47aeb06dae4aa5560c'
let sortBy = 'All'


async function getNews() {
    let res = await fetch(`https://newsapi.org/v2/everything?q=${sortBy}&from=2023-02-15&sortBy=publishedAt&apiKey=${newsApiKey}`)
    let data = await res.json()
    // console.log(data);
    try {
        if (data.status == "ok") {
            let popularBlogContainerRes = ``
            for (let i = 0; i < 3; i++) {
                const randomInt = Math.floor(Math.random() * 100);
                let res = data.articles[randomInt];
                // console.log(data.articles[randomInt]);
                let imgSrc = ''
                let author;
                if (res.urlToImage === null) {
                    imgSrc = '../images/default-image.jpg'
                } else {
                    imgSrc = res.urlToImage
                }
                if (res.author == null) {
                    author = 'Jamshid'
                } else {
                    author = res.author.slice(0, 20)
                }
                popularBlogContainerRes += `
                <div class="card my-2" style="width: 24rem;">
                <img style="height: 14rem" src="${imgSrc}" class="card-img-top" alt="...">
                <div class="card-body">
                  <p>${author} l ${res.publishedAt} </p>
                  <h5 class="card-title">${res.title.slice(0,50)}</h5>
                  <p class="card-text">${res.description.slice(0,100)}</p><br>
                  <button data-name='${res.title}' data-description="${res.description}" href="#" class="btn btn-secondary">See More</button>
                </div>
              </div>
                `
                popularBlogContainer.innerHTML = popularBlogContainerRes;
            }

        }
    } catch (err) {
        console.error(err);
    } finally {

    }
}

// categoriesContainer.addEventListener("click", (e) => {
//     console.log(e.target);
// });

businessBtn.addEventListener("click", () => {
    sortBy = "Business";
    popularBlog.textContent = "Popular blogs (Business)";
        getNews()
})
startUpBtn.addEventListener("click", () => {
    sortBy = "Startup";
    popularBlog.textContent = "Popular blogs (StartUp)";
    getNews()
})
economyBtn.addEventListener("click", () => {
    sortBy = "Economy";
    popularBlog.textContent = "Popular blogs (Economy)";
    getNews()
})
technologyBtn.addEventListener("click", () => {
    sortBy = "Technology";
    popularBlog.textContent = "Popular blogs (Technology)";
    getNews()
})
getNews()