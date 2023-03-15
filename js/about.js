const Name = document.querySelector(".Name");
const title = document.querySelector(".Title")
const time = document.querySelector(".time")
const text = document.querySelector(".Text")
const form = document.querySelector("form")
const aboutContainer = document.querySelector(".about-container")
const loader = document.querySelector(".loader")

const button = document.querySelector(".btn")
let url = "https://reqres.in/api/users"

async function reqresApi() {
    let res = await fetch(url)
    let data = await res.json()
    console.log(data);
    form.addEventListener("submit", (e) => {

        loader.classList.add("d-flex")
        e.preventDefault();
        const nameInput = document.querySelector("#name").value;
        const titleInput = document.querySelector("#title").value;
        const textArea = document.querySelector("#text").value;
        const newTime = new Date()
        const formData = {
            name: nameInput,
            title: titleInput,
            text: textArea
        }

        aboutContainer.classList.add("d-block")
        form.classList.add("d-none")
        fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(response => response.json()).then(data => {
            Name.textContent = data.name;
            title.textContent = data.title;
            text.textContent = data.text;
            time.textContent = newTime.toLocaleDateString()
        }).finally(()=>[
            loader.classList.add("d-none")
        ])

    })
    // loader.classList.add("d-none")
}

reqresApi()