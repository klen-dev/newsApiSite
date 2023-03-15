const newsApiKey = '43d9e280e2a74a47aeb06dae4aa5560c';
const blogContainer = document.querySelector("#blog-container")
const searchInput = document.querySelector("input[type=text]")
const submitBtn = document.querySelector("#submitbtn")
const blogPagination =document.querySelector(".blog-pagination")

let blogPage = 1;


async function getNews() {
    let baseUrl;
    if(searchInput.value){
        baseUrl = `https://newsapi.org/v2/everything?q=${searchInput.value}&sortBy=publishedAt&apiKey=${newsApiKey}&page=${blogPage}`
    } else{
        baseUrl = `https://newsapi.org/v2/everything?q=All&sortBy=publishedAt&apiKey=${newsApiKey}&page=${blogPage}`
    }

    blogContainer.innerHTML = ''
    // console.log(data);
    try {
        let res = await fetch(baseUrl)
        let data = await res.json()
        console.log(data);
        if (data.totalResults > 0) {
            let result = '';
            var blogImg = '';
            for(let i = 0; i <= data.articles.length-1; i++){
                let res = data.articles[i];
                // console.log(res);
                if(res.urlToImage == null){
                    blogImg = '../images/default-image.jpg'
                }else{
                    blogImg = res.urlToImage;
                }
                result += `
                <div class="blog row">
                <div class="blog-left col-12 pb-3 col-xxl-4">
                    <img src="${blogImg}" alt="">
                    </div>
                    <div class="blog-right col-12 col-xxl-8">
                    <h6 class="pb-2">
                    ${res.source.name}
                    </h6>
                    <h4 class="pb-5">
                        ${res.title}
                    </h4>
                    <p>
                    ${res.description}
                    </p>
                    </div>
                    </div>
                    `
                }
                blogContainer.innerHTML = result;

                blogPagination.innerHTML = "";
                let maxPages;
                if(data.articles.length > 1000){
                    maxPages = 10
                } else{
                    maxPages = Math.ceil(data.totalResults/100);
                }
                for(let i = 1; i <= 10; i++){
                    let page = document.createElement("button")
                    page.classList.add("btn", "btn-secondary")
                    page.innerText = i;
                    blogPagination.appendChild(page)
                    page.addEventListener("click", (e)=>{
                        e.preventDefault()
                        blogPage=i;
                        getNews()
                    })
                    if(page === i){
                        page.classList.add("active")
                    }
                }

            } else{
                let errorPage = document.createElement("h2")
                errorPage.innerText = "Ma'lumot topilmadi!"
                errorPage.style.textAlign = "center"
                blogContainer.appendChild(errorPage)
                blogPagination.innerHTML = "";
            }
        } catch (err) {
            console.error(err);
        } 
    }

submitBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    getNews()
})

getNews()


